'use strict';

const events = require( 'events' ),
	net = require( 'net' ),
	PORT = 9990;
let	_connected,

    /**
	 * @type {net.Socket}
     */
	connection;

exports.__proto__ = Object.create( new events.EventEmitter );

/**
 *	Connect to the hub
 *	@method connect
 *	@param {String} ipAddress
 */
exports.connect = function( ipAddress ) {
    if ( _connected ) return connection;

    const t = this,
        config = {
            host: ipAddress,
            port: PORT
        };

    connection = net.connect( config );

    connection.on( 'error', function( e ) {
        exports.emit( 'error', e );
    } );

    connection.on( 'connect', function() {
        exports.emit( 'connection', null );
    } );

    connection.on( 'data', function( dataString ) {

        let log = [];

        const data = t._requestDecode( dataString.toString( 'utf8' ), log );

        t._updateData( data );

    } );

    _connected = true;

    return this;
};

/**
 *	Route an input
 *	@method route
 *	@param {Number} output
 *	@param {Number} input
 *	@param {Function} cb
 */
exports.route = function(output, input, cb) {

    let routeConfig = {},
        request;

    routeConfig[ output ] = input;

    request = this._requestEncode( {
        'VIDEO OUTPUT ROUTING': routeConfig,
    } );

    // console.log( request, {
    //     'VIDEO OUTPUT ROUTING': routeConfig,
    // } );
    console.log( '"' + request + '"' );
    console.log( connection.write( request, 'utf8', cb ) );
    console.log( connection.write( Buffer.from( request, 'utf8' ), 'utf8', cb ) );

};

/**
 *	Set or get an outputLabel
 *	@method outputLabel
 *	@param {Number} output
 *	@param {String} label
 *	@param {Function} cb
 */
exports.outputLabel = function(output, label, cb) {

};

/**
 *	Set or get an inputLabel
 *	@method inputLabel
 *	@param {Number} input
 *	@param {String} label
 *	@param {Function} cb
 */
exports.inputLabel = function(input, label, cb) {

};

exports._updateData = function( data ) {

    let blockKeys = Object.keys( data ),
        firstBlocks = [ 'PROTOCOL PREAMBLE', 'VIDEOHUB DEVICE', 'ACK', 'NAK' ],
        blockKey,
        index,
        bk;

    // Go through the Initial Blocks
    for ( bk in firstBlocks ) {

        blockKey = firstBlocks[ bk ];

        if ( (index = blockKeys.indexOf( blockKey )) >= 0 ) {
            this._emitBlock( blockKey, data[ blockKey ] );
            blockKeys[ index ] = '';
        }

    }

    // go through other Blocks
    for ( bk in blockKeys ) {

        blockKey = blockKeys[ bk ];

        if ( !blockKeys.hasOwnProperty( bk ) && !data.hasOwnProperty( blockKey ) ) {
            continue;
        }

        this._emitBlock( blockKey, data[ blockKey ] );

    }
};

exports._emitBlock = function( blockKey, blockData ) {

    let key;

    this.emit( 'items_' + blockKey, blockData, blockKey );

    for ( key in blockData ) {
        if ( blockData.hasOwnProperty( key ) ) {
            this.emit( 'item_' + blockKey, key, blockData[ key ], blockKey );
        }
    }
};

/**
 * Transforms an Request from String to an Object
 * @method _requestDecode
 * @param {string} string
 * @param {object} log
 * @return {object}
 * @private
 */
exports._requestDecode = function( string, log ) {

    if ( typeof log === 'undefined' ) {
        let log = [];
    }

    const lines = string.split( /\r?\n/ );

    let i,
        request = {},
        current = false,
        line,
        unknownCounter = 0,
        m, key, value;

    for ( i in lines ) {

        line = lines[ i ];

        // Block End
        if ( line === '' ) {

            current = false;
            continue;

        }

        // New Block Headline
        if ( current === false ) {

            line = line.substr( 0, line.length - 1 );

            current = line;

            if ( request.hasOwnProperty( line ) ) {
                log.push( { status: 'error', code: 1, text: 'existing Block "' + line + '" overwritten' } );
            }

            request[ line ] = {};
            current = line;

            continue;

        }

        // ID : Value
        if ( m = line.match( /^\d+\s/g ) ) {

            key = m[ 0 ].substr( 0, m[ 0 ].length - 1 );
            value = line.substr( m[ 0 ].length );

            request[ current ][ key ] = value;

            continue;
        }

        // Key: Value
        if ( (m = line.indexOf( ':' )) >= 0 ) {

            key = line.substr( 0, m );
            value = line.substr( m + 1 );

            if ( value.charAt( 0 ) === ' ' ) {
                value = value.substr( 1 );
            }

            request[ current ][ key ] = value;

            continue;
        }

        // Unknown
        request[ current ][ 'unknown' + unknownCounter++ ] = line;

    }

    return request;

};

/**
 * Transforms an Request from Object to String
 * @method _requestDecode
 * @param {object} request
 * @param {object} log
 * @return {string}
 * @private
 */
exports._requestEncode = function( request, log ) {

    if ( typeof log === 'undefined' ) {
        let log = [];
    }

    let lines = [],
        blockName, block, i;

    for ( blockName in request ) {

        block = request[ blockName ];

        lines.push( blockName + ':' );

        for ( i in block ) {

            if ( isNaN( i ) ) {
                lines.push( i + ': ' + block[ i ] );
            } else {
                lines.push( i + ' ' + block[ i ] );
            }

        }

        lines.push( '' );

    }

    return lines.join( '\n' ) + '\n';

};