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
            idToEdit: ""
        }
    },
    methods : {
        changed(){
            if(!this.search){
                this.notes = JSON.parse(localStorage.getItem("notes")) || [];
            }
            console.log(this.search);
            this.notes = this.notes.filter((note) => {
                return note.title.toLowerCase().includes(this.search.toLowerCase());
            })
        },
        displayFormNote(){
            this.seenEditNote = false;
            this.bodyNote = "";
            this.titleNote = "";
            if (!this.seenAddNote)
                this.seenAddNote = true;
            else
                this.seenAddNote = false;
        },
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
            // this.seenAddNote = false;
            localStorage.setItem("notes", JSON.stringify(this.notes));
        },
        deleteNote(id) {
            this.notes = this.notes.filter((note) => {
              return id !== note.id;
            });
            localStorage.setItem("notes", JSON.stringify(this.notes));
        },
        countWord(){   
            const trimmedText = this.bodyNote.trim();
            
            this.nbWord = trimmedText.length === 0 ? 0: trimmedText.split(" ").length;
        },
        editNote(note){
            this.seenAddNote = false;
            this.seenEditNote = true;
            this.titleNote = note.title;
            this.bodyNote = note.content;
            this.idToEdit = note.id;
            console.log(note);
        },
        updateNote(){
            console.log(this.idToEdit)
            const noteToEdit = this.notes.find( note => note.id === this.idToEdit);
            console.log(noteToEdit);
            noteToEdit.title = this.titleNote;
            noteToEdit.content = this.bodyNote;
            localStorage.setItem("notes", JSON.stringify(this.notes));
            console.log(noteToEdit);
        },
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