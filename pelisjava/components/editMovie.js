export default class EditMovieComponent{
        constructor() {
            this.btnEditMovie = document.getElementById('btnEditMovie');
            this.titleEditMovie = document.getElementById('titleEditMovie');
            this.yearEditMovie = document.getElementById('yearEditMovie');
            this.alertEditMovie = document.getElementById('alertEditMovie');
        }
    
        onClick( callback ){
            this.btnEditMovie.onclick = () => {
                if(this.titleEditMovie.value === '' || this.yearEditMovie.value === ''){
                    this.alertEditMovie.classList.remove('d-none');
                    this.alertEditMovie.innerText = 'Los campos Pelicula y/o Plataforma Stream, estan vacios';
                    console.log("empty");
                    return;
                } 
                    this.alertEditMovie.classList.add('d-none');
                    callback(this.titleEditMovie.value, this.yearEditMovie.value);

                    this.titleEditMovie.value = "";
                    this.yearEditMovie.value = "";
                    this.formEditMovie.classList.add('d-none');
                
            }
        }

     }
