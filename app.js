const yargs = require('yargs');
const fs = require('fs');
const notes = require("./notes.json");

yargs.command({
    command: 'add',
    describe: "For adding a note",
    builder: {
        title: {
            describe: 'Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
            notes.push({
                "title": argv.title,
                "body": argv.body
            });
            fs.writeFile("notes.json", JSON.stringify(notes), () => {
                console.log("Note created!");
            })
        
        }

});

yargs.command({
    command: 'remove',
    describe: 'For removing note',
    builder: {
        title: {
            describe: 'Title',
            demandOption: true,
            type: 'string'
        }
    },

    handler: function (argv) {
            var dt = notes.filter((data) => {
                return data.title.toLowerCase() != argv.title.toLowerCase();
            });
            fs.writeFile('notes.json', JSON.stringify(dt), () => {
                console.log('Note removed!');
            })
    }
});

yargs.command({
    command: 'read',
    describe: 'For Reading note',
    builder: {
        title: {
            describe: 'Title',
            demandOption: true,
            type: 'string'
        }
    },

    handler: function (argv) {
        notes.forEach((data, index) => {
            if (data.title.toLowerCase() == argv.title.toLowerCase()) {
                console.log((data.title + ':') + (notes[index].body));
            }

        });
    }
});

yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler(argv) {
        
            notes.forEach((data) => {
                console.log((data.title +' '));
            });
        }
});

yargs.parse();