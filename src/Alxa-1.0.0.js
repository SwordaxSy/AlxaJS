/**
 * Alxa Software (a javascript library)
 *      by Swordax Sy
 * Alxa is a multi-task simple lightweight JavaScript library with pre-written codes
 * and functions, simple but time-consuming functions to write, to make
 * JavaScript coding easier on developers.
 *
 * Github Repo: https://github.com/SwordaxSy/AlxaJS
 *
 * Swordax Info
 *      - github: https://github.com/SwordaxSy
 *      - discord: Swordax#5756
 *      - at: @swordax.sy
 *      - website: https://swordax.netlify.app/
 *
 * © Swordax 2022 -> Present
 */

const Alxa = {
    // String Functions
    capitalize: function (string) {
        // capitalize first letter in every word in a string

        // Validation
        if (typeof string !== "string")
            throw Error("capitalize() expected a string as an argument");

        // Logic
        const splitted = string.split(" ");
        const capitalized = [];
        splitted.forEach((word) => {
            capitalized.push(word[0].toUpperCase() + word.slice(1));
        });

        return capitalized.join(" ");
    },
    count: function (values, value, caseSensitive = true) {
        // count occurrences of a specific value in a string or an array

        // Validation
        if (!Array.isArray(values) && typeof values !== "string")
            throw Error(
                "count() expected a string or an array as first argument"
            );
        if (typeof value !== "string")
            throw Error("count() expected a string as a second argument");
        if (typeof caseSensitive !== "boolean")
            throw Error("count() expected a boolean as a third argument");

        // Logic
        if (!caseSensitive) {
            value = value.toLowerCase();
        }

        if (typeof values == "string") {
            if (!caseSensitive) values = values.toLowerCase();
            return values.split(value).length - 1;
        } else {
            if (!caseSensitive) {
                values.forEach((val, index) => {
                    values[index] = val.toLowerCase();
                });
            }
            return values.join(" ").split(value).length - 1;
        }
    },
    swapCase: function (string) {
        // Validation
        if (typeof string !== "string")
            throw Error("swapCase() expected a string as an argument");

        // Logic
        const swapped = string
            .split("")
            .map((char) => {
                return char.toLowerCase() == char
                    ? char.toUpperCase()
                    : char.toLowerCase();
            })
            .join("");

        return swapped;
    },
    randomCase: function (string) {
        // Validation
        if (typeof string !== "string")
            throw Error("randomCase() expected a string as an argument");

        // Logic
        const randomized = string
            .split("")
            .map((char) => {
                const rand = this.randomIndex(2);
                return rand == 0 ? char.toLowerCase() : char.toUpperCase();
            })
            .join("");

        return randomized;
    },
    cleanText: function (string, words, full = true) {
        // hide specific words from strings

        // Validation
        if (typeof string !== "string")
            throw Error("cleanText() expected a string as a first argument");

        const isString = typeof words == "string";

        if (!Array.isArray(words) && !isString)
            throw Error(
                "cleanText() expected a string or an array as a second argument"
            );
        if (typeof full !== "boolean")
            throw Error("cleanText() expected a boolean as a third argument");

        // Logic
        /*
            full means hide full word or just the specified part
            example: hide the word "hack" in "this world if full of hacking"
            full: this world is full of *******
            !full: this world is full of ****ing
        */

        // removing case sensitivity
        string = string.toLowerCase();
        if (isString) {
            words = words.toLowerCase();
        } else {
            words.forEach((word, index) => {
                words[index] = word.toLowerCase();
            });
        }

        // cleaning algorithm
        if (!full) {
            if (isString) {
                string = string.replaceAll(
                    words,
                    "".padStart(words.length, "*")
                );
            } else {
                words.forEach((word) => {
                    string = string.replaceAll(
                        word,
                        "".padStart(word.length, "*")
                    );
                });
            }
        } else {
            string = string.split(" ");

            for (let i = 0; i < string.length; i++) {
                if (isString) {
                    if (string[i].includes(words)) {
                        string[i] = "".padStart(string[i].length, "*");
                    }
                } else {
                    words.forEach((word) => {
                        if (string[i].includes(word)) {
                            string[i] = "".padStart(string[i].length, "*");
                        }
                    });
                }
            }

            string = string.join(" ");
        }

        return string;
    },
    randomString: function (options = {}) {
        // generate random customizable string

        // destructure and assign default options
        const {
            letters = true,
            numbers = true,
            symbols = true,
            lowercase = true,
            uppercase = true,
            length = 24,
            excludes = "",
        } = options;

        // Validation
        if (!letters && !numbers && !symbols) {
            throw Error(
                `randomString() should have one or more of these options set to true (letters, numbers, symbols)`
            );
        }
        [letters, numbers, symbols, lowercase, uppercase].forEach((option) => {
            if (typeof option !== "boolean") {
                throw Error(
                    `randomString() options (letters, numbers, symbols, lowercase, uppercase) should all be of type boolean`
                );
            }
        });
        if (typeof length !== "number")
            throw Error(
                `randomString() option length should be of type number`
            );
        if (typeof excludes !== "string" && !Array.isArray(excludes))
            throw Error(
                "randomString() option (excludes) should be of type string or array"
            );
        if (!lowercase && !uppercase && letters)
            throw Error(
                "randomString() expected options lowercase or uppercase to be set to true"
            );

        // Logic
        // character lists
        const lists = {
            letters: "qwertyuiopasdfghjklzxcvbnm",
            numbers: "0123456789",
            symbols: "~!@#$%^*[]{}()/.,?;:|",
        };

        // removing excluded characters from the lists
        if (typeof excludes == "string") {
            for (let list in lists) {
                lists[list] = lists[list].replace(excludes, "");
            }
        } else {
            excludes.forEach((exc) => {
                for (let list in lists) {
                    lists[list] = lists[list].replace(exc, "");
                }
            });
        }

        // assigning selected character types
        const types = [];
        letters ? types.push("letters") : null;
        numbers ? types.push("numbers") : null;
        symbols ? types.push("symbols") : null;

        // algorithm for generating random characters as per given rubrics
        let finalString = "";
        for (let i = 0; i < length; i++) {
            const randomType = types[this.randomIndex(types.length)];
            const chosenList = lists[randomType];
            let randomChar = chosenList[this.randomIndex(chosenList.length)];
            if (letters) {
                if (!lowercase && uppercase)
                    randomChar = randomChar.toUpperCase();
                else if (lowercase && uppercase)
                    randomChar = this.randomCase(randomChar);
            }
            finalString += randomChar;
        }

        return finalString;
    },

    // Mathematic Functions
    mean: function (array) {
        // find the mean (average) out of a array of numbers

        // Validation
        if (!Array.isArray(array))
            throw Error("mean() expected an array as an argument");

        // Logic
        return (
            array.reduce((total, num) => {
                return total + num;
            }) / array.length
        );
    },
    median: function (array) {
        // find the median number out of an array of numbers

        // Validation
        if (!Array.isArray(array))
            throw Error("median() expected an array as an argument");

        // Logic
        array.sort((a, b) => {
            return a - b;
        });
        let half = array.length / 2;

        return Number(
            array.length % 2 == 0
                ? this.mean(array.slice(half - 1, half + 1))
                : array.slice(half, half + 1)
        );
    },
    mode: function (array) {
        // find the mode out of an array of numbers

        // Validation
        if (!Array.isArray(array))
            throw Error("mode() expected an array as an argument");

        // Logic
        const dict = {};

        array.forEach((num) => {
            const propName = `${num}`;
            if (dict.hasOwnProperty(propName)) {
                dict[propName] = dict[propName] + 1;
            } else {
                dict[propName] = 1;
            }
        });

        let currentMax = null;
        for (let prop in dict) {
            if (dict[prop] > currentMax) {
                currentMax = prop;
            }
        }

        return Number(currentMax);
    },
    max: function (array) {
        // find the maximum number out of an array of numbers

        // Validation
        if (!Array.isArray(array))
            throw Error("max() expected an array as an argument");

        // Logic
        return Math.max(...array);
    },
    min: function (array) {
        // find minimum number out of an array of numbers

        // Validation
        if (!Array.isArray(array))
            throw Error("min() exepcted an array as an argument");

        // Logic
        return Math.min(...array);
    },
    range: function (array) {
        // find the range out of an array of numbers

        // Validation
        if (!Array.isArray(array))
            throw Error("range() expected an array as an argument");

        // Logic
        return this.max(array) - this.min(array);
    },
    random: function (from, to) {
        // generate a random number in a range

        // Validation
        if (typeof from !== "number" || typeof to !== "number")
            throw Error(
                "random() expected two arguments (from, to) of type number"
            );

        // Logic
        return arguments.length == 1
            ? Math.floor(Math.random() * (from + 1))
            : Math.floor(Math.random() * (to - from + 1) + from);
    },
    randomIndex: function (length) {
        // generate a random index number (for arrays randomized selection)

        // Validation
        if (typeof length !== "number")
            throw Error("randomIndex() expected an argument of type number");

        // Logic
        return Math.floor(Math.random() * length);
    },
    isEven: function (number) {
        // check if given number is even

        // Validation
        if (typeof number !== "number")
            throw Error("isEven() expected a number as an argument");

        // Logic
        let remainder = number % 2;
        return remainder == 0 ? true : false;
    },
    isOdd: function (number) {
        // check if given number is odd

        // Validation
        if (typeof number !== "number")
            throw Error("isOdd() expected a number as an argument");

        // Logic
        let remainder = number % 2;
        return remainder == 0 ? false : true;
    },
    formatNumber: function (number, rounded = false) {
        // number formatter

        // Validation
        if (typeof number !== "number" && typeof number !== "string")
            throw Error(
                "formatNumber() expected a number or a string as a first argument"
            );

        // the formatted number can be chosen to be formatted or not (rounded argument)
        if (typeof rounded !== "boolean") {
            throw Error(
                "formatNumber() expected a boolean as a third argument"
            );
        }

        // Logic
        number = Number(number);
        let divideBy = 1;
        let suffix = "";
        let formattedNum;

        if (number >= 1000 && number < 1000000) {
            divideBy = 1000;
            suffix = "K";
        }
        if (number >= 1000000 && number < 1000000000) {
            divideBy = 1000000;
            suffix = "M";
        }
        if (number >= 1000000000 && number < 1000000000000) {
            divideBy = 1000000000;
            suffix = "B";
        }
        if (number >= 1000000000000 && number < 1000000000000000) {
            divideBy = 1000000000000;
            suffix = "T";
        }
        if (number >= 1000000000000000 && number < 1000000000000000000) {
            divideBy = 1000000000000000;
            suffix = "Q";
        }

        // rounding mechanism
        if (rounded) formattedNum = Math.round(number / divideBy);
        else formattedNum = (number / divideBy).toFixed(1);

        return `${formattedNum}${suffix}`;
    },
    area: function (shape, options) {
        // method to find area

        // Validation (further validation exists)
        function throwError(options) {
            options = options.join(" and ");
            throw Error("area() expected ${options} in options argument");
        }
        if (typeof shape !== "string")
            throw Error("area() expected a string as a first argument");

        // Logic
        const x = options.width || options.w || options.x;
        const y = options.length || options.l || options.y;

        const b = options.base || options.b || options.x;
        const h = options.height || options.h || options.y;

        const r = options.radius || options.r;
        const p = options.parameter || options.param || options.p;
        const s = options.side || options.s || options.sideLength;
        const a = options.apothem || options.a || options.apothemLength;
        const sides = options.sides || options.sidesCount;

        // area formulas
        switch (shape) {
            case "rectangle": {
                if (!x || !y) throwError(["width", "length"]);
                return x * y;
            }

            case "circle": {
                if (!r) throwError(["radius"]);
                return Math.PI * Math.pow(r, 2);
            }

            case "triangle": {
                if (!b || !h) throwError(["base", "height"]);
                return 0.5 * (b * h);
            }

            case "pentagon": {
                if (!a) throwError(["apothem"]);
                if (!p && !s) {
                    throw Error(
                        "area() expected parameter or side in options argument"
                    );
                }
                // two formulas were provided for polygons
                if (p) {
                    return 0.5 * (p * a);
                } else if (side) {
                    return 0.5 * (s * 5 * a);
                }
            }

            case "hexagon": {
                if (!s) throwError(["side"]);
                return (3 * Math.sqrt(3) * Math.pow(s, 2)) / 2;
            }

            case "heptagon": {
                if (!s) throwError(["side"]);
                return (7 / 4) * (Math.pow(s, 2) * (1 / Math.tan(Math.PI / 7)));
            }

            case "octagon": {
                if (!s) throwError(["side"]);
                return 2 * (1 + Math.sqrt(2)) * Math.pow(s, 2);
            }

            case "polygon": {
                // formula that can be used for any shape (more inputs required)
                if (!sides || !s || !a)
                    throwError(["sidesCount", "sideLength", "apothemLength"]);
                return (sides * s * a) / 2;
            }
        }
    },
    volume: function (shape, options) {
        // method to find volume

        // Validation
        function throwError(options) {
            options = options.join(" and ");
            throw Error("volume() expected ${options} in options argument");
        }
        if (typeof shape !== "string")
            throw Error("volume() expected a string as a first argument");

        // Logic
        const x = options.width || options.w || options.x;
        const y = options.height || options.h || options.y;
        const z = options.length || options.l || options.z;

        const b = options.base || options.b || options.x;
        const h = options.height || options.h || options.y;

        const r = options.radius || options.r;

        // volume formulas
        switch (shape) {
            case "sphere": {
                if (!r) throwError(["radius"]);
                return (4 / 3) * Math.PI * Math.pow(r, 3);
            }
            case "r-prism":
            case "cuboid":
            case "cube": {
                if (!x || !y || !z) throwError(["width", "height", "length"]);
                return x * y * z;
            }
            case "cylinder": {
                if (!r || !h) throwError(["radius", "height"]);
                return Math.PI * Math.pow(r, 2) * h;
            }
            case "cone": {
                if (!r || !h) throwError(["radius", "height"]);
                return (1 / 3) * Math.PI * Math.pow(r, 2) * h;
            }
            case "t-pyramid": {
                if (!b || !h) throwError(["base", "height"]);
                return (1 / 3) * b * h;
            }
            case "r-pyramid": {
                if (!x || !y || !z) throwError(["width", "height", "length"]);
                return (1 / 3) * x * y * z;
            }
        }
    },

    // Date & Time Formatting
    formatDate: function (date, format) {
        // date formatter

        // Validation -none here- (further validation exists)

        // destructure date object
        const fullDate = new Date(date),
            _date = fullDate.getDate(),
            _month = fullDate.getMonth() + 1,
            _year = fullDate.getFullYear(),
            year_ = _year.toString().substring(2),
            hour = fullDate.getHours(),
            _hour = (() => {
                if (hour == 0) return 12;
                return hour > 12 ? hour - 12 : hour;
            })(),
            _minute = fullDate.getMinutes().toString().padStart(2, "0"),
            dayTime = (() => {
                return hour >= 12 ? "PM" : "AM";
            })(),
            months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];

        // format
        switch (format.toLowerCase()) {
            case "mm/dd/yyyy":
                return `${_month}/${_date}/${_year}`;
            case "dd/mm/yyyy":
                return `${_date}/${_month}/${_year}`;
            case "mm/dd/yy":
                return `${_month}/${_date}/${year_}`;
            case "dd/mm/yy":
                return `${_date}/${_month}/${year_}`;
            case "dd mm, yy":
                return `${_date} ${months[_month - 1]}, ${year_}`;
            case "dd mm, yy tt":
                return `${_date} ${
                    months[_month - 1]
                }, ${year_} at ${_hour}:${_minute} ${dayTime}`;
            case "hh:mm":
                return `${hour}:${_minute}`;
            case "hh:mm a":
                return `${_hour}:${_minute} ${dayTime}`;
            default:
                throw Error("formatDate() received an undefined format");
        }
    },

    // Sleep
    sleep: function (milliseconds) {
        // sleep function (stops the code for a specified amount of time)

        // Validation
        if (typeof milliseconds !== "number")
            throw Error("sleep() expected a number as an argument");

        // Logic
        const promise = new Promise((res) => {
            setTimeout(res, milliseconds);
        });

        return promise;
    },

    // Colors
    randomRGB: function () {
        // generate a random RGB color
        const red = this.randomIndex(256),
            green = this.randomIndex(256),
            blue = this.randomIndex(256);

        return `rgb(${red}, ${green}, ${blue})`;
    },
    randomHEX: function () {
        // generate a random HEX color
        const rgb = this.randomRGB();
        const hex = this.toHEX(rgb);

        return hex;
    },
    toHEX: function (color) {
        // convert RGB to HEX

        // Validation
        if (typeof color !== "string")
            throw Error(
                "toHEX() expected a hex color in string form as an argument"
            );

        // Logic
        color = color
            .toLowerCase()
            .replaceAll("rgb", "")
            .replaceAll("(", "")
            .replaceAll(")", "")
            .split(",");
        color = color.map((c) => c.trim());

        const c_hex = (c) => {
            return Number(c).toString(16).padStart(2, "0");
        };

        return `#${c_hex(color[0])}${c_hex(color[1])}${c_hex(color[2])}`;
    },
    toRGB: function (color) {
        // convert HEX to RGB

        // Validation
        if (typeof color !== "string")
            throw Error(
                "toRGB() expected an rgb color in string form as an argument"
            );

        // Logic
        const rgb = color
            .replace(
                /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                (m, r, g, b) => r + r + g + g + b + b
            )
            .substring(1)
            .match(/.{2}/g)
            .map((x) => parseInt(x, 16));

        return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    },

    // DOM Functions
    isElement: function (object) {
        // check if object is a DOM element or not
        const element = document.createElement("div");

        try {
            element.appendChild(object);
        } catch (err) {
            return false;
        }

        return true;
    },
    isVisible: function (element) {
        // check if element is visible on the user screen (viewport)

        // Validation
        if (!this.isElement(element))
            throw Error("isVisible() expected an element as an argument");

        // Logic
        // get element client rects
        const clientRect = element.getBoundingClientRect();

        return (
            clientRect.top >= 0 &&
            clientRect.left >= 0 &&
            clientRect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
            clientRect.right <=
                (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    css: function (selector, property, value) {
        // edit css style of an element

        // Validation (further validation exists)
        if (typeof property !== "string" || typeof value !== "string")
            throw Error(
                "css() expected a string value as a second and third arguments"
            );
        const isArray = Array.isArray(selector);
        if (typeof selector !== "string" && !isArray)
            throw Error(
                "css() expected a string or an array value as a first argument"
            );

        // Logic
        // select element/elements
        const element = isArray
            ? (() => {
                  const elements = [];
                  selector.forEach((select) => {
                      const el = document.querySelectorAll(select);
                      elements.push(el);
                  });
                  return elements;
              })()
            : document.querySelectorAll(selector);

        // validate element/elements
        element.forEach((elem) => {
            if (!isArray && !this.isElement(elem)) {
                throw Error("css() received an invalid selector");
            } else if (isArray) {
                elem.forEach((el) => {
                    if (!this.isElement(el)) {
                        throw Error("css() received an invalid selector");
                    }
                });
            }
        });

        // filter property
        let newProp = "";
        if (property.split("-").length > 1) {
            let index = property.indexOf("-");
            for (let i = 0; i < property.length; i++) {
                if (i == index) continue;
                if (i == index + 1) {
                    newProp += property[i].toUpperCase();
                } else {
                    newProp += property[i];
                }
            }
        } else {
            newProp = property;
        }

        // try to assign CSS value to property
        try {
            if (isArray) {
                element.forEach((elem) => {
                    elem.forEach((el) => {
                        el.style[newProp] = value;
                    });
                });
                return true;
            }
            element.forEach((el) => {
                el.style[newProp] = value;
            });
            return true;
        } catch (err) {
            throw Error(
                `css() couldn't assign value for invalid CSS property "${property}"`
            );
        }
    },
    on: function (element, event, callback, useCapture = false) {
        // attach event listeners on HTML elements

        // Validation
        const isInstance = element.toString === "[object Window]";
        if (!this.isElement(element) && !isInstance)
            throw Error("on() expected an element as a first argument");
        if (typeof event !== "string")
            throw Error("on() expected an event name as a second argument");
        if (typeof callback !== "function")
            throw Error(
                "on() expected a callback function as a third agrument"
            );
        if (typeof useCapture !== "boolean")
            throw Error("on() expected a boolean as a fourth argument");

        // Logic
        try {
            element.addEventListener(event, callback, useCapture);
            return true;
        } catch (err) {
            throw Error("on() couldn't attach event listener on element");
        }
    },
};
