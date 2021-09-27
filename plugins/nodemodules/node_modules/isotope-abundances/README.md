# isotope-abundances
A simple library to provide isotope abundances with JavaScript

View on npm [here](https://www.npmjs.com/package/isotope-abundances).

***Please note that this package is now on version 2.0 and is no longer compatible with version 1.0. The return format of the data is now different.***

## Installation
npm install isotope-abundances --save

## Usage
``` javascript
var isoAbund = require('isotope-abundances');
console.log(isoAbund('H'));
```
Output:
```
{
    "Mass": 1.00794,
    "Isotopes": [
      {
        "Mass": 1.00782503223,
        "Abundance": 0.999885
      },
      {
        "Mass": 2.01410177812,
        "Abundance": 0.000115
      }
    ]
  }
```
The output for each isotope is a JSON object where "Mass" contains the average mass of the atom and the "Isotopes" array contains the mass and abundance of each isotope.

## Tests
You can run `npm test` to run the tests after installing the development dependencies.

## Data
The isotope data for this package comes from [NIST](https://www.nist.gov/pml/atomic-weights-and-isotopic-compositions-column-descriptions) and was retrieved on June 1st, 2017. The "Linearized ASCII Output" for all elements and all isotopes can be found in `NIST_DATA.dat`. The script `generate_json.js` can be used to regenerate the `ISOTOPES.json` file which contains the isotopic distribution data. The development dependencies must be installed before running `generate_json.js`.

## License
This software is released under the MIT license

## Support this project!

[![Support this project on Patreon!](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/MikeTheBiochem)
