import AddMovieComponent from "./components/add-movie.js";
import FiltroMovieComponent from "./components/filtroMovie.js";
import EditMovieComponent from "./components/editMovie.js";


export default class View {
    constructor(){
        this.model = null;
        this.table = document.getElementById('table');

        this.addMovieComponent = new AddMovieComponent();
        this.addMovieComponent.onClick( (t,y) => this.addMovie(t,y) );
               
        this.filtroMovieComponent =  new FiltroMovieComponent();
        this.filtroMovieComponent.onkeyup();

        this.editMovieComponent = new EditMovieComponent();
        this.editMovieComponent.onClick();
        
        this.formEditMovie = document.getElementById('formEditMovie');
        this.titleEditMovie = document.getElementById('titleEditMovie');
        this.yearEditMovie = document.getElementById('yearEditMovie');
        this.btnEditMovie = document.getElementById('btnEditMovie');
    }


    render() {
        const movies = this.model.getMovies();
        movies.forEach(movie => this.createRow(movie));
    }

    setModel(model){
        this.model = model;
    }

    addMovie(title, year){
        const movie = this.model.addMovie(title, year);
        this.createRow(movie);
    }

    editMovie(id){
        console.log(id);
    }

    removeMovie(id){
        this.model.removeMovie(id);
        this.removeRow(id);
    }

   
    toogleViewIt(id){
        this.model.toogleViewIt(id);
    }

    configEditMovie(movie){
        this.titleEditMovie.value=""+movie.title+"";
        this.yearEditMovie.value=""+movie.year+"";
        this.formEditMovie.classList.remove('d-none');
        this.btnEditMovie.onclick = () => {
            console.log(this.titleEditMovie.value,this.yearEditMovie.value, movie.viewIt );
            this.model.editMovie(this.titleEditMovie.value,this.yearEditMovie.value, movie.viewIt);

        }
    }

    createRow(movie){

        const row = this.table.insertRow();
        row.setAttribute('id', movie.id);
        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.year}</td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = movie.viewIt;
        checkbox.onclick = () => this.toogleViewIt(movie.id);
        row.children[2].appendChild(checkbox);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeMovie(movie.id);
        row.children[3].appendChild(removeBtn);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-warning', 'mb-1', 'ml-1');
        editBtn.innerHTML = '<i class="fa fa-edit"></i>';
        editBtn.onclick = () => this.configEditMovie(movie);
        row.children[4].appendChild(editBtn);
    
    }

    removeRow(id){
        document.getElementById(id).remove();
    }
  }


