export default class MovieModel {
    constructor(){
        this.view = null;
        this.movies = JSON.parse(localStorage.getItem('movies'));
        if(!this.movies || this.movies.length < 1){
            this.movies = [];
            this.currentId = 1;
        }else{
            this.currentId = this.movies[this.movies.length - 1].id + 1;
        }
    }

    setView(view){
        this.view = view;
    }

    getMovies(){
        return this.movies.map( m => ({...m}) );
    }

    addMovie(title, year, ){
        const movie = {
            id: this.currentId++,
            title,
            year,
            viewIt: false,
            editMovie:true
        };

        this.movies.push(movie);
        this.save();
        return { ...movie };
    }

    findMovie(id){
        return this.movies.findIndex( m => m.id === id);
    }

    removeMovie(id) {
        const index = this.findMovie(id);
        this.movies.splice(index, 1);
        this.save();
    }

    editMovie(title, year, viewIt, id){
        var movieid = this.findMovie(id);  
        console.log(viewIt);

        const movie = {
            id: movieid,
            title,
            year,
            viewIt: viewIt,
            editMovie:true
        };//*

        this.movies.splice(movieid, 1, movie);
        
        this.save();
    }


    toogleViewIt(id){
        const index = this.findMovie(id);
        const movie = this.movies[index];
        movie.viewIt = !movie.viewIt;
        this.save();
    }

    save(){
        localStorage.setItem('movies', JSON.stringify(this.movies));
        document.location.reload();
    }

}