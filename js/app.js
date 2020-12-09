const options = {
    data() {
        return {
            seenAddNote : false,
            search : "",
        }
    },
    methods : {
        changed(){
            console.log(this.search);
        },
        addNote(){
            if (!this.seenAddNote)
                this.seenAddNote = true;
            else
                this.seenAddNote = false;
        }
    }
}

const app = Vue.createApp(options);

app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});

app.mount("#app")