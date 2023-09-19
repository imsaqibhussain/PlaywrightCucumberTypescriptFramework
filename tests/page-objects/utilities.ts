import { expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';
import fs from 'fs';

export class Utilities {

    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async enterRandomNumber(length: number) {
        let result = '';
        const characters = '0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }

      async readAPIDetails() {
        const userDetails = readFileSync(
            join('tests/setup/expected/api.json'),
            'utf-8'
        );
        const details = await JSON.parse(userDetails);
        return details;
    }

    async readUserDetails() {
        const userDetails = readFileSync(
            join('tests/setup/expected/details.json'),
            'utf-8'
        );
        const details = await JSON.parse(userDetails);
        return details;
    }

    // Function to write data to a JSON file
    async writeJSONToFile(filename, data) {
        // Convert the data to a JSON string
        const jsonData = JSON.stringify(data, null, 2); // The second argument adds formatting for readability

        // Write the JSON data to the file
        fs.writeFileSync(`tests/setup/expected/${filename}`, jsonData, 'utf8');

        console.log(`Data has been written to ${filename}`);
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
                console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Verifying Field => ' + title[i] + '  %%%%%%%%%%%%%%%%%%%%%%%%%%%%% \n');
                console.log(title[i] + ': Received values are => ' + actual[i]);
                console.log(title[i] + ': Expected values from json => ' + expected[i]);
                console.log('Actual Value ' + i + ' : ' + actual[i] + ' & Expected Value is =' + expected[i]);
                await expect(actual[i]).toEqual(expected[i]);
            }
        } else {
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Verifying Field => ' + title + '  %%%%%%%%%%%%%%%%%%%%%%%%%%%%% \n');
            console.log(title + ': Received values are => ' + actual);
            console.log(title + ': Expected values from json => ' + expected);
            console.log('Actual Value ' + ' : ' + actual + ' & Expected Value is =' + expected);
            await expect(actual).toEqual(expected);
        }
        console.log('\n' + '==============\u001b[1;35mMatching Function Call End\u001b[1;37m===============' + '\n');
    }
}
