/**
 * Description
 *
 * Created by micharohde on 28.10.18.
 *
 * SDG
 */

/* globals require, module, window */

// var cl = require( 'consoleLog' )( 'exampleData' );

'use strict';



module.exports = {
    start: {
        'PROTOCOL PREAMBLE': {
            Version: '2.7'
        },
    },
    all: {
        'VIDEOHUB DEVICE': {
            'Device present': 'true',
            'Model name': 'Blackmagic Smart Videohub 20 x 20',
            'Friendly name': 'Smart Videohub 20 x 20',
            'Unique ID': '7C2E0D0A5485',
            'Video inputs': '20',
            'Video processing units': '0',
            'Video outputs': '20',
            'Video monitoring outputs': '0',
            'Serial ports': '0',
        },
        'INPUT LABELS': {
            '0': 'SB Halle',
            '1': 'Program Out',
            '2': 'Multiview',
            '3': 'Auxiliar 3',
            '4': 'Input 5',
            '5': 'Input 6',
            '6': 'Input 7',
            '7': 'Input 8',
            '8': 'Input 9',
            '9': 'Input 10',
            '10': 'Input 11',
            '11': 'Input 12',
            '12': 'Input 13',
            '13': 'Input 14',
            '14': 'Input 15',
            '15': 'Input 16',
            '16': 'Input 17',
            '17': 'Input 18',
            '18': 'Input 19',
            '19': 'Input 20',
        },
        'OUTPUT LABELS': {
            '0': 'SB Halle',
            '1': 'Projektor L',
            '2': 'Projektor M',
            '3': 'Projektor R',
            '4': 'Emphore 1',
            '5': 'Emphore 2',
            '6': 'Ton Studio 1',
            '7': 'Ton Studio 2',
            '8': 'Familien Raum',
            '9': 'Output 10',
            '10': 'Buchladen (R)',
            '11': 'Output 12',
            '12': 'Output 13',
            '13': 'Output 14',
            '14': 'Monitor Halle',
            '15': 'Multiview Regie',
            '16': 'SSD Recorder',
            '17': 'Monitor Regie',
            '18': 'PC InternStream',
            '19': 'PC Recording',
        },
        'VIDEO OUTPUT LOCKS': {
            '0': 'U',
            '1': 'U',
            '2': 'U',
            '3': 'U',
            '4': 'U',
            '5': 'U',
            '6': 'U',
            '7': 'U',
            '8': 'U',
            '9': 'U',
            '10': 'U',
            '11': 'U',
            '12': 'U',
            '13': 'U',
            '14': 'U',
            '15': 'U',
            '16': 'U',
            '17': 'U',
            '18': 'U',
            '19': 'U',
        },
        'VIDEO OUTPUT ROUTING': {
            '0': '0',
            '1': '3',
            '2': '3',
            '3': '3',
            '4': '1',
            '5': '1',
            '6': '2',
            '7': '2',
            '8': '1',
            '9': '10',
            '10': '1',
            '11': '11',
            '12': '1',
            '13': '13',
            '14': '2',
            '15': '2',
            '16': '1',
            '17': '3',
            '18': '1',
            '19': '1',
        },
        CONFIGURATION: {
            'Take Mode': 'true',
        },
        'END PRELUDE': {},
    },

};
