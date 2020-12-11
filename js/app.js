const options = {
    data() {
        return {
            seenAddNote : false,
            search : "",
            bodyNote: "",
            notes: [],
            titleNote: "",
            nbWord: "",
            seenEditNote: false,
            idToEdit: "",
            idBigNote: ""
        }
    },
    methods : {
        // Chercher une note
        searchNote(){
            if(!this.search){
                this.notes = JSON.parse(localStorage.getItem("notes")) || [];
            }
            console.log(this.search);
            this.notes = this.notes.filter((note) => {
                return note.title.toLowerCase().includes(this.search.toLowerCase());
            })
        },        
        // Afficher le formulaire d'ajout
        displayFormNote(){
            this.seenEditNote = false;
            this.bodyNote = "";
            this.titleNote = "";
            if (!this.seenAddNote)
                this.seenAddNote = true;
            else
                this.seenAddNote = false;
        },
        // Créer une note
        addNote(){
            if (!this.bodyNote || !this.titleNote) {
                return;
            }
            const bodyNote = {
                id: Date.now(),
                content: this.bodyNote,
                title: this.titleNote
            };
            this.notes.unshift(bodyNote);
            this.bodyNote = "";
            this.titleNote = "";
            localStorage.setItem("notes", JSON.stringify(this.notes));
        },
        // Supprimer une note
        deleteNote(id) {
            this.notes = this.notes.filter((note) => {
              return id !== note.id;
            });
            localStorage.setItem("notes", JSON.stringify(this.notes));
        },
        // Compter le nombre de mots
        countWord(){   
            const trimmedText = this.bodyNote.trim();
            
            this.nbWord = trimmedText.length === 0 ? 0: trimmedText.split(" ").length;
        },
        // Afficher le formulaire d'édition
        editNote(note){
            this.seenAddNote = false;
            this.seenEditNote = true;
            this.titleNote = note.title;
            this.bodyNote = note.content;
            this.idToEdit = note.id;
            console.log(note);
        },
        // Mettre à jour la note
        updateNote(){
            const noteToEdit = this.notes.find( note => note.id === this.idToEdit);
            noteToEdit.title = this.titleNote;
            noteToEdit.content = this.bodyNote;
            localStorage.setItem("notes", JSON.stringify(this.notes));
            this.seenEditNote = false;
        },
        // Afficher les notes longues en entier
        displayBigNote(id){
            this.idBigNote = id;
        }
    },
    mounted() {
        this.notes = JSON.parse(localStorage.getItem("notes")) || [];
    },
}

const app = Vue.createApp(options);

app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});

app.mount("#app")