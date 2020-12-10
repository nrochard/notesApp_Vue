const options = {
    data() {
        return {
            seenAddNote : false,
            search : "",
            bodyNote: "",
            notes: [],
            titleNote: "",
            nbWord: "",
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
            console.log(this.nbWord)
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