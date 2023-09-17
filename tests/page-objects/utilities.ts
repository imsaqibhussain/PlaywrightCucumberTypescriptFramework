import { expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

export class Utilities {

    async readUserDetails() {
        const userDetails = readFileSync(
            join('tests/setup/expected/details.json'),
            'utf-8'
        );
        const details = await JSON.parse(userDetails);
        return details;
    }

    async valueValidations(
        actual: any,
        expected: any,
        title: any,
        screenName: any,
    ) {
        console.log('\n' + '=============\u001b[1;35mMatching Function Call Start\u001b[1;37m===============' + '\n');
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Matching Values for => ' + screenName + ' Screen %%%%%%%%%%%%%%%%%%%%%%%%%%%%% \n');

        if (Array.isArray(title)) {
            for (let i = 0; i < title.length; i++) {
                console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Verifying Field => ' + title[i] +'  %%%%%%%%%%%%%%%%%%%%%%%%%%%%% \n');
                console.log(title[i] + ': Received values are => ' + actual[i]);
                console.log(title[i] + ': Expected values from json => ' + expected[i]);
                console.log('Actual Value ' + i + ' : ' + actual[i] + ' & Expected Value is =' + expected[i]);
                await expect(actual[i]).toEqual(expected[i]);
            }
        } else {
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Verifying Field => ' + title +'  %%%%%%%%%%%%%%%%%%%%%%%%%%%%% \n');
            console.log(title + ': Received values are => ' + actual);
            console.log(title + ': Expected values from json => ' + expected);
            console.log('Actual Value ' + ' : ' + actual + ' & Expected Value is =' + expected);
            await expect(actual).toEqual(expected);
        }
        console.log('\n' +'==============\u001b[1;35mMatching Function Call End\u001b[1;37m===============' +'\n');
    }


}
