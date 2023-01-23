class Song {
    constructor(name, rating) {
        this.name = name;
        this.rating = rating;
    }

    describe (){
        return `${this.name} is given a rating of ${this.rating}.`;
    }
}

class Artist {
    constructor(name) {
        this.name = name;
        this.songs = [];
    }

    addSong(song) {
        if(song instanceof Song){
            this.songs.push(song);
        } else {
            throw new Error(`You can only add an instance of Song. Argument is not a song: ${song}`);
        }
    }

    describe(){
        return `${this.name} has ${this.songs.length} songs.`;
    }
}

class Menu {
    constructor(){
        this.artists = [];
        this.selectedArtist = null;
    }

    start(){
        let selection = this.showMainMenuOptions();
        
        while (selection != 0) {
            switch (selection){
                case '1':
                    this.addArtist();
                    break;
                case '2':
                    this.viewArtist();
                    break;
                case '3':
                    this.deleteArtist();
                    break;
                case '4':
                    this.displayArtists();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert(`See you later alligator`);
    }

    showMainMenuOptions(){
        return prompt(`
            1) Add Artist
            2) View Artist
            3) Delete Artist
            4) Display Artist
            0) Exit
        `);
    }

    showArtistMenuOptions(artistInfo){
        return prompt(`
        1) Add Song
        2) Delete Song
        0) Back
        
        ${artistInfo}
        `);  
    }

    displayArtists(){
        let artistString = '';
        for(let i = 0; i < this.artists.length; i++){
            artistString += i + ')' + this.artists[i].name + '\n';
        }
        alert(artistString);
    }

    addArtist(){
        let name = prompt(`Enter the name of the Artist: `);
        this.artists.push(new Artist (name));
    }

    viewArtist(){
        let index = prompt(`Enter the index of the artist you wish to view.`);
        if(index > -1 && index < this.artists.length) {
            this.selectedArtist = this.artists[index];
            let description = 'Artist name: ' + this.selectedArtist.name + '\n';

            for(let i = 0; i < this.selectedArtist.songs.length; i++) {
                description += i + ')' + this.selectedArtist.songs[i].name + ' - ' + this.selectedArtist.songs[i].rating + '\n';
            }

            let selection = this.showArtistMenuOptions(description);
            switch(selection) {
                case '1':
                    this.enterSong();
                    break;
                case '2':
                    this.deleteSong();
            }
        }
    }

    deleteArtist(){
        let index = prompt(`Enter the index of the artist you wish to delete. `);
        if(index > -1 && index < this.artists.length) {
            this.artists.splice(index, 1);
        }
    }

    enterSong(){
        let name = prompt(`Add song`);
        let rating = prompt(`Give your song a rating`);
        this.selectedArtist.songs.push(new Song (name, rating));
        
    }

    deleteSong(){
        let index = prompt(`Enter the index of the song you wish to delete.`);
        if(index > -1 && index < this.selectedArtist.songs.length){
            this.selectedArtist.songs.splice(index, 1); 
        }
    }
}

let menu = new Menu();
menu.start();