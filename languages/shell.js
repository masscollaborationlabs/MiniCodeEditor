const SHELL_RULES = {
    "highlights": [
        {
            "regex": "&",
            "replaceTo": "&amp;"
        },
        {
            "regex": "<",
            "replaceTo": "&lt;"
        },
        {
            "regex": ">",
            "replaceTo": "&gt;"
        },
        {
            "regex": "=",
            "replaceTo": "&equals;"
        },
        {   // Text between quotation marks
            "regex": /("(.*?)"|'(.*?)')/gm,
            "replaceTo": "<SPAN class='mini-code-editor-green-imp'>$&</SPAN>"
        },
        {   // Comments
            "regex": /(?:\#.*)/gm,
            "replaceTo": "<SPAN class='mini-code-editor-brown-imp'>$&</SPAN>"
        },
        {   // Variables declaration
            "regex": /([a-zA-Z_$][a-zA-Z_$0-9]*(?=&equals;))/g,
            "replaceTo": "<SPAN CLASS='mini-code-editor-red'>$&</SPAN>"
        },
        {
            "regex": /(\$[a-zA-Z_$][a-zA-Z_$0-9]*)/g,
            "replaceTo": "<SPAN CLASS='mini-code-editor-red'>$&</SPAN>"
        },
        {
            "regex": /(\$\(.*\))/g,
            "replaceTo": "<SPAN CLASS='mini-code-editor-red'>$&</SPAN>"
        },
        {
            "regex": /(`.*`)/g,
            "replaceTo": "<SPAN CLASS='mini-code-editor-red'>$&</SPAN>"
        },
        {
            "regex": /(\$\{.*\})/g,
            "replaceTo": "<SPAN CLASS='mini-code-editor-red'>$&</SPAN>"
        },
        {
            "regex": /([a-zA-Z_{1}][a-zA-Z0-9_]+)(?= *\()/gm,
            "replaceTo": "<SPAN CLASS='mini-code-editor-blue'>$&</SPAN>"
        },
        {
            "regex": /\b(for|do|done)\b/g,
            "replaceTo": "<SPAN CLASS='mini-code-editor-blue'>$&</SPAN>"
        },
        {
            "regex": /\b(while|until)\b/g,
            "replaceTo": "<SPAN CLASS='mini-code-editor-blue'>$&</SPAN>"
        },
        {
            "regex": /\b(continue|break)\b/g,
            "replaceTo": "<SPAN CLASS='mini-code-editor-blue'>$&</SPAN>"
        },
        {
            "regex": /\b(select)\b/g,
            "replaceTo": "<SPAN CLASS='mini-code-editor-blue'>$&</SPAN>"
        },
        {
            "regex": /\b(function)\b/g,
            "replaceTo": "<SPAN CLASS='mini-code-editor-blue'>$&</SPAN>"
        },
        {
            "regex": /\b(case|in|esac)\b/g,
            "replaceTo": "<SPAN CLASS='mini-code-editor-blue'>$&</SPAN>"
        },
        {
            "regex": /\b(if|elif|else|then|fi)\b/g,
            "replaceTo": "<SPAN CLASS='mini-code-editor-blue'>$&</SPAN>"
        },
        {
            "regex": /\n$/g,
            "replaceTo": "\n\n"
        }
    ],
    "character_pairs": {
        "(": ")",
        "\"": "\"",
        "'": "'",
        "{": "}",
        "[": "]"
    },
    "backspace_pairs": ["\"\"", "''", "()", "{}", "[]"],
    "newline_pairs": ["()", "{}", "[]"],
    "shortcuts": [
        {
            "keyword": "bash",
            "left": "#!/usr/bin/env bash\n",
        },
        {
            "keyword": "elif",
            "left": "elif [ ",
            "right": " ]; then\n\t"
        },
        {
            "keyword": "for",
            "left": "for (( ",
            "right": " ;  ;  )); do\n\t\ndone"
        },
        {
            "keyword": "fun",
            "left": "function ",
            "right": "(){\n\t\n}"
        },
        {
            "keyword": "fundoc",
            "left": "#===  FUNCTION  ==========================================\n#         NAME:  ",
            "right": "\n#  DESCRIPTION:  \n#========================================================="
        },
        {
            "keyword": "fori",
            "left": "for ",
            "right": " in  ; do\n\t\ndone"
        },
        {
            "keyword": "if",
            "left": "if [ ",
            "right": " ]; then\n\t\nfi"
        },
        {
            "keyword": "ife",
            "left": "if [ ",
            "right": " ]; then\n\t\nelse\n\t\nfi"
        },
        {
            "keyword": "ifel",
            "left": "if [ ",
            "right": " ]; then\n\t\nelif [  ]; then\n\t\nelse\n\t\nfi"
        },
        {
            "keyword": "man",
            "left": "#================================================================\n# HEADER\n#================================================================\n#% SYNOPSIS\n#+    ",
            "right": "\n#%    \n#% DESCRIPTION\n#%    \n#%    \n#%    \n#% OPTIONS\n#%    \n#%    \n#%    \n#%    \n#%    \n#% EXAMPLES\n#%    \n#%    \n#%    \n#================================================================\n#- IMPLEMENTATION\n#-    version         \n#-    author          \n#-    copyright       Copyright (c) \n#-    license         GNU General Public License\n#================================================================"
        },
        {
            "keyword": "sh",
            "left": "#!/usr/bin/env sh\n",
        },
        {
            "keyword": "case",
            "left": "case $",
            "right": " in\n\t\nesac"
        },
        {
            "keyword": "until",
            "left": "until [ ",
            "right": " ]; do\n\t\ndone"
        },
        {
            "keyword": "while",
            "left": "while [ ",
            "right": " ]; do\n\t\ndone"
        }
    ]
}
