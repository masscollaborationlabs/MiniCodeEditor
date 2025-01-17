/**
    Mini Code Editor - Simple code editor or your web applications
    Copyleft (Ↄ) 2024 Adrian Bogdan. All wrongs reserved.
    License: GPL v3.0
    Github: https://github.com/AdrBog/MiniCodeEditor
 */

class MiniCodeEditor{
    #TEXTAREA_TABS_REGEX = /^\t*/g;

    #RULES = {
        "highlights": [],
        "character_pairs": {},
        "backspace_pairs": [],
        "newline_pairs": [],
        "shortcuts": []
    }

    #DEFAULT_TEXT
    #HISTORY_SIZE = 512
    #HISTORY = new Array(this.#HISTORY_SIZE)
    fontSize = 12

    #codeEditor;
    #codeEditorBackdrop;
    #codeEditorHighlight;
    #codeEditorTextarea;

    constructor(selector){
        this.#codeEditor = document.querySelector(selector)
        this.#DEFAULT_TEXT = this.#codeEditor.innerHTML

        if (!document.querySelector(".mini-code-editor")){
            this.#styleCodeEditor()
        }
        this.#generateCodeEditor()
        this.#addEventsListeners()
        this.setFontSize(this.fontSize)
        this.setValue(this.#DEFAULT_TEXT)
    }

    #generateCodeEditor(){
        this.#codeEditor.innerHTML = `
            <div class="mini-code-editor">
                <div class="mini-code-editor-backdrop">
                    <div class="mini-code-editor-highlights mini-code-editor-text"></div>
                </div>
                <textarea wrap="off" class="mini-code-editor-textarea mini-code-editor-text" spellcheck="false"></textarea>
            </div>
        `
        this.#codeEditorBackdrop = this.#codeEditor.querySelector(".mini-code-editor-backdrop")
        this.#codeEditorHighlight = this.#codeEditor.querySelector(".mini-code-editor-highlights")
        this.#codeEditorTextarea = this.#codeEditor.querySelector("textarea")
    }

    #styleCodeEditor(){
        const STYLE = document.createElement("style")
        STYLE.innerText = `
        :root{
            --mce-color-blue: blue;
            --mce-color-red: red;
            --mce-color-green: green;
            --mce-color-orange: orange;
            --mce-color-purple: purple;
            --mce-color-brown: brown;
            --mce-color-black: black;
            --mce-color-white: white;
            --mce-color-bg: white;
            --mce-color-fg: black;
            --mce-color-caret: black;
            --mce-color-select: rgba(153, 153, 255, 0.5);
            --mce-editor-font: monospace;
            --mce-editor-line-height: 1;
            --mce-editor-border: 2px groove black;
            --mce-editor-border-focus:  black 0px 1px 4px, black 0px 0px 0px 3px;
        }
        
        .mini-code-editor-blue{color: var(--mce-color-blue);}
        .mini-code-editor-red{color: var(--mce-color-red);}
        .mini-code-editor-green{color: var(--mce-color-green);}
        .mini-code-editor-orange{color: var(--mce-color-orange);}
        .mini-code-editor-purple{color: var(--mce-color-purple);}
        .mini-code-editor-brown{color: var(--mce-color-brown);}
        .mini-code-editor-black{color: var(--mce-color-black);}

        .mini-code-editor-blue-imp, .mini-code-editor-blue-imp *{color: var(--mce-color-blue);}
        .mini-code-editor-red-imp, .mini-code-editor-red-imp *{color: var(--mce-color-red);}
        .mini-code-editor-green-imp, .mini-code-editor-green-imp *{color: var(--mce-color-green);}
        .mini-code-editor-orange-imp, .mini-code-editor-orange-imp *{color: var(--mce-color-orange);}
        .mini-code-editor-purple-imp, .mini-code-editor-purple-imp *{color: var(--mce-color-purple);}
        .mini-code-editor-brown-imp, .mini-code-editor-brown-imp *{color: var(--mce-color-brown);}
        .mini-code-editor-black-imp, .mini-code-editor-black-imp *{color: var(--mce-color-black);}

        *{
            box-sizing: border-box;
        }

        .mini-code-editor{
            position: relative;
            width: 196px;
            height: 138px;
            border: var(--mce-editor-border);
            border-radius: 2px;
            background-color: var(--mce-color-bg);
            color: var(--mce-color-fg);
        }

        .mini-code-editor-backdrop, .mini-code-editor-highlights, .mini-code-editor-textarea{
            border: 0;
            background-color: transparent;
            text-align: left;
        }

        .mini-code-editor-text{
            font-family: var(--mce-editor-font);
            line-height: var(--mce-editor-line-height);
        }

        .mini-code-editor-highlights, .mini-code-editor-line-number, .mini-code-editor-textarea{
            position:absolute;
            margin: 0;
            padding: 4px;
        }

        .mini-code-editor-backdrop, .mini-code-editor-textarea{
            height: 100%;
        }

        .mini-code-editor-backdrop {
            width: 100%;
            position:absolute;
            overflow: scroll;
        }

        .mini-code-editor-highlights {
            white-space: pre-wrap;
            word-wrap: break-word;
            width: max-content;
        }

        .mini-code-editor-textarea {
            width: 100%;
            display: block;
            color: transparent;
            caret-color: var(--mce-color-caret);
            resize: none;
            overflow: auto;
        }

        .mini-code-editor-textarea:focus{
            box-shadow: var(--mce-editor-border-focus);
            outline: none;
        }

        .mini-code-editor-textarea::selection{
            color: transparent;
            background-color: var(--mce-color-select) !important;
        }
        `
        document.head.append(STYLE)
    }

    #addEventsListeners(){
        this.#codeEditorTextarea.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.key === 'z'){
                e.preventDefault()
                this.#undo()
                return
            }

            const textarea = this.#codeEditorTextarea
            const charPairsList = this.#RULES["character_pairs"]
            const charLeft = this.#getTextareaCharacter(textarea, -1, 1)
            const charRight = this.#getTextareaCharacter(textarea, 0, 1)
            const charPair = this.#getTextareaCharacter(textarea, -1, 2)

            if (!["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)){
                this.#saveHistory()
            }

            if (e.key === "Tab") {
                e.preventDefault();
                this.#insertText(textarea, "\t");
            } else if (e.key === "Enter") {
                e.preventDefault();
                if (this.#RULES["newline_pairs"].includes(charPair)) {
                    this.#insertText(textarea, "\n")
                    this.#insertText(textarea, "\n")
                    this.#moveTextareaCursor(textarea, (this.#getTabLevel(textarea)[0].length * -1) - 1)
                    this.#insertText(textarea, "\t")
                } else {
                    this.#insertText(textarea, "\n")
                }
            } else if (Object.keys(charPairsList).includes(e.key)) {
                e.preventDefault();
                this.#duplicateCharacter(textarea, e.key + charPairsList[e.key])
            } else if (Object.values(charPairsList).includes(e.key)) {
                e.preventDefault();
                if (Object.keys(charPairsList).includes(charLeft) && e.key == charPairsList[charLeft] && charRight == charPairsList[charLeft]) {
                    this.#moveTextareaCursor(textarea, 1)
                } else {
                    this.#insertText(textarea, e.key)
                }
            } else if (e.key === "Backspace") {
                e.preventDefault();
                if (this.#RULES["backspace_pairs"].includes(charPair)) {
                    this.#removeInTextarea(textarea, 0, 1)
                }
                this.#removeInTextarea(textarea)
            } else if (e.ctrlKey && e.key === ' '){
                e.preventDefault()
                for (const key of this.#RULES["shortcuts"]) {
                    if (this.#getTextareaCharacter(textarea, key["keyword"].length * -1, key["keyword"].length) == key["keyword"]){
                        let tabs = this.#getTabLevel(textarea)
                        this.#removeInTextarea(textarea, key["keyword"].length)
                        this.#insertText(textarea, key["left"] ?? "", tabs)
                        this.#insertTextStaticCursor(textarea, key["right"] ?? "", tabs)
                    }
                }
            } else if (e.key === 'F1'){
                e.preventDefault()
                alert(`List of shortcuts:\n${this.#RULES["shortcuts"].map((x) => x["keyword"]).join(", ")}`)
            } else if (e.ctrlKey && e.key === '+') {
                e.preventDefault()
                this.setFontSize(this.fontSize + 2)
                this.#undo()
            } else if (e.ctrlKey && e.key === '-') {
                e.preventDefault()
                this.setFontSize(this.fontSize - 2)
                this.#undo()
            }
            this.#handleInput()
        })
        
        this.#codeEditorTextarea.addEventListener("input", () => {
            this.#handleInput()
        })
        
        this.#codeEditorTextarea.addEventListener("keyup", () => {
            this.#handleInput()
        })
        
        this.#codeEditorTextarea.addEventListener("scroll", () => {
            this.#handleScroll()
        })
    }

    #applyHighlights(text) {
        for (const x of this.#RULES["highlights"]) {
            text = text.replace(new RegExp(x["regex"], 'g'), x["replaceTo"])
        }
        return text
    }
    
    #handleInput() {
        var text = this.#codeEditorTextarea.value
        var highlightedText = this.#applyHighlights(text)
        this.#codeEditorHighlight.innerHTML = highlightedText
    }
    
    #handleScroll() {
        this.#codeEditorBackdrop.scrollTop = this.#codeEditorTextarea.scrollTop
        this.#codeEditorBackdrop.scrollLeft = this.#codeEditorTextarea.scrollLeft
    }

    #saveHistory(){
        this.#HISTORY.unshift(
            {
                "value": this.#codeEditorTextarea.value,
                "position": this.#codeEditorTextarea.selectionStart
            }
        )
        this.#HISTORY = this.#HISTORY.splice(0, this.#HISTORY_SIZE)
    }

    #undo(){
        try{
            this.#codeEditorTextarea.value = this.#HISTORY[0]["value"]
            this.#codeEditorTextarea.selectionStart = this.#HISTORY[0]["position"]
            this.#codeEditorTextarea.selectionEnd = this.#codeEditorTextarea.selectionStart
            this.#handleInput()
            this.#handleScroll()
            this.#HISTORY.shift()
        }catch{}
    }
    
    #moveTextareaCursor(textarea, position = 1) {
        textarea.selectionStart = textarea.selectionStart + position
        textarea.selectionEnd = textarea.selectionStart
    }
    
    #duplicateCharacter(textarea, char) {
        this.#insertText(textarea, char)
        this.#moveTextareaCursor(textarea, -1)
    }

    #getTabLevel(textarea){
        return this.#getTextareaLine(textarea).match(this.#TEXTAREA_TABS_REGEX)
    }
    
    #getTextareaLine(textarea) {
        const lines = textarea.value.split("\n");
        let selection = 0;
        for (const line of lines) {
            for (let index = 0; index <= line.length; index++) {
                selection++;
                if (selection >= textarea.selectionStart)
                    return line;
            }
        }
        return null;
    }
    
    #getTextareaCharacter(textarea, offset = 0, end = 1) {
        return textarea.value.slice(textarea.selectionStart + offset, textarea.selectionStart + offset + end)
    }
    
    #insertText(textarea, text, tabs = this.#getTabLevel(textarea)) {
        const position = textarea.selectionStart;
        const end = position;
        text = text.toString().replace(/\n/g, "\n" + tabs)
        textarea.setRangeText(text, position, end, 'select')
        textarea.selectionStart = textarea.selectionEnd;
    }

    #insertTextStaticCursor(textarea, text, tabs = this.#getTabLevel(textarea)){
        const position = textarea.selectionStart;
        this.#insertText(textarea, text, tabs)
        textarea.selectionStart = position;
        textarea.selectionEnd = position;
    }
    
    #removeInTextarea(textarea, leftOffset = 1, rightOffset = 0) {
        if (textarea.selectionStart != textarea.selectionEnd) {
            leftOffset = 0
        }
        const position = textarea.selectionStart - leftOffset
        const startText = textarea.value.slice(0, textarea.selectionStart - leftOffset)
        const endText = textarea.value.slice(textarea.selectionEnd + rightOffset, textarea.value.length)
        textarea.value = startText + endText
        textarea.selectionStart = position
        textarea.selectionEnd = position
    }

    setFontSize(size){
        this.fontSize = size
        this.#codeEditorTextarea.style.fontSize = this.fontSize + "px";
        this.#codeEditorHighlight.style.fontSize = this.fontSize + "px";
    }

    getValue(){
        return this.#codeEditorTextarea.value
    }

    setValue(value){
        this.#codeEditorTextarea.value = value
        this.#handleInput()
        this.#handleScroll()
    }

    appendValue(value){
        this.#codeEditorTextarea.value += value
        this.#handleInput()
        this.#handleScroll()
    }

    setReadOnly(readonly){
        if(readonly){
            this.#codeEditorTextarea.setAttribute("readonly", "")
        } else {
            this.#codeEditorTextarea.removeAttribute("readonly")
        }
    }

    setWordWrap(wordwrap){
        if(wordwrap){
            this.#codeEditorTextarea.removeAttribute("wrap")
            this.#codeEditorHighlight.style.width = "100%"
        } else {
            this.#codeEditorTextarea.setAttribute("wrap", "off")
            this.#codeEditorHighlight.style.width = "max-content"
        }
    }

    setRules(value){
        this.#RULES = value
        this.#handleInput()
        this.#handleScroll()
    }
}
