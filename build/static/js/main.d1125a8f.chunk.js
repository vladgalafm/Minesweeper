(this.webpackJsonpreact_minesweeper=this.webpackJsonpreact_minesweeper||[]).push([[0],Array(19).concat([function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(2),l=n.n(a),i=n(9),s=n.n(i),c=n(8),r=n(13),o=n(6),d=n(1),u=n(10),m=n(11),j=n(3),h=n(14),g=n(12),b=(n(19),n(20),n(0)),f=function(e){var t=e.title,n=e.switchBlockHandler;return Object(b.jsx)("button",{className:"menu-btn",onClick:n,children:t})},O=function(e){var t=e.switchBlockHandler;return Object(b.jsxs)("section",{className:"menu",children:[Object(b.jsx)("h1",{className:"menu__title",children:"Minesweeper"}),Object(b.jsxs)("div",{className:"menu__btn-wrap",children:[Object(b.jsx)(f,{title:"New game",switchBlockHandler:function(){t("new-game")}}),Object(b.jsx)(f,{title:"Settings",switchBlockHandler:function(){t("settings")}}),Object(b.jsx)(f,{title:"Tutorial",switchBlockHandler:function(){t("tutorial")}})]})]})},p=(n(22),function(e){var t=e.inProgress,n=e.timeProceed,a=e.flagMode,l=e.minesLeft,i=e.leaveGameHandler,s=e.toggleFlagMode;return Object(b.jsx)("div",{className:"game-header",children:Object(b.jsxs)("div",{className:"game-header__content",children:[Object(b.jsx)("button",{className:"game-header__leave",onClick:function(){i()}}),Object(b.jsxs)("div",{className:"game-header__info",children:[Object(b.jsx)("div",{className:"game-header__icon"}),Object(b.jsx)("div",{className:"game-header__count",children:n})]}),Object(b.jsxs)("div",{className:"game-header__info",children:[Object(b.jsx)("div",{className:"game-header__count",children:l}),Object(b.jsx)("div",{className:"game-header__icon game-header__icon--bomb"})]}),Object(b.jsx)("button",{className:"game-header__flag".concat(a?" game-header__flag--active":""),onClick:s,disabled:!t})]})})}),x=(n(23),function(e){var t=e.started,n=e.colIndex,a=e.rowIndex,l=e.cell,i=e.clickOnCellHandler,s=e.toggleFlagOnCellHandler,c=l.opened,r=l.mine,o=l.minesAround,d=l.flagged,u=l.defused,m=l.blownUp,j=l.rightFlagged,h=l.wrongFlagged,g=Math.max(n+1,a+1)+Math.min(n+1,a+1),f={animationDelay:"".concat(.008*g,"s")};return Object(b.jsx)("div",{className:"game-cell".concat(c?" game-cell--opened":"","\n            ").concat(d?" game-cell--flagged":"","\n            ").concat(u?" game-cell--defused":"","\n            ").concat(m?" game-cell--blown-up":j?" game-cell--right-flagged":h?" game-cell--wrong-flagged":"","\n            ").concat(t?"":" game-cell--flashlight"),style:!t&&f||{},onContextMenu:function(e){e.preventDefault()},children:Object(b.jsx)("button",{className:"game-cell__btn ".concat(c&&r?"game-cell__btn--mine":c&&o>0?"game-cell__btn--".concat(o):""),disabled:c,onClick:i,onContextMenu:s})})}),v=(n(24),function(e){var t=e.started,n=e.rows,a=e.colIndex,l=e.cellsCol,i=e.clickOnCellHandler,s=e.toggleFlagOnCellHandler,c=Array.apply(null,{length:n});return Object(b.jsx)("div",{className:"game-column",children:c.map((function(e,n){return Object(b.jsx)(x,{started:t,colIndex:a,rowIndex:n,cell:l[n],clickOnCellHandler:function(){return i(a,n)},toggleFlagOnCellHandler:function(e){e.preventDefault(),s(a,n)}},n)}))})}),w=(n(25),function(e){var t=e.started,n=e.cols,a=e.rows,l=e.cells,i=e.clickOnCellHandler,s=e.toggleFlagOnCellHandler,c=Array.apply(null,{length:n});return Object(b.jsx)("div",{className:"game-field",children:Object(b.jsx)("div",{className:"game-field__content",children:c.map((function(e,n){return Object(b.jsx)(v,{started:t,colIndex:n,rows:a,cellsCol:l[n],clickOnCellHandler:i,toggleFlagOnCellHandler:s},n)}))})})}),y=(n(26),function(e){var t=e.layoutMode,n=e.started,a=e.inProgress,l=e.cols,i=e.rows,s=e.cells,c=e.timeProceed,r=e.flagMode,o=e.minesLeft,d=e.leaveGameHandler,u=e.toggleFlagMode,m=e.clickOnCellHandler,j=e.toggleFlagOnCellHandler;return Object(b.jsxs)("div",{className:"game ".concat(t).concat(l>9?" game--wide":"")+"".concat(n&&!a?" game--finished":""),children:[Object(b.jsx)(p,{inProgress:a,timeProceed:c,flagMode:r,minesLeft:o,leaveGameHandler:d,toggleFlagMode:u}),Object(b.jsx)(w,{started:n,cols:l,rows:i,cells:s,clickOnCellHandler:m,toggleFlagOnCellHandler:j})]})}),k=(n(27),function(e){var t=e.value,n=e.label,a=e.mines,l=e.selected;return Object(b.jsxs)("div",{className:"diff-option diff-option--".concat(t),children:[Object(b.jsx)("input",{className:"diff-option__input",type:"radio",value:t,id:t,name:"difficulty",defaultChecked:l}),Object(b.jsxs)("label",{className:"diff-option__label",htmlFor:t,children:[n,Object(b.jsx)("br",{}),t," grid, ",a," mines"]})]})}),S={"9x9":10,"9x16":20,"16x16":40,"30x16":99},C=[{value:"9x9",label:"Beginner"},{value:"9x16",label:"Amateur"},{value:"16x16",label:"Intermediate"},{value:"30x16",label:"Expert"}].map((function(e){return Object(d.a)(Object(d.a)({},e),{},{mines:S[e.value]})})),M={bestTime:1/0,gamesPlayed:0,gamesWon:0,longestWinStreak:0,longestLoseStreak:0,currentWinStreak:0,currentLoseStreak:0},_=function(e){return{difficulty:"9x9",cols:9,rows:9,cells:e,started:!1,inProgress:!1,timeProceed:0,flaggedAmount:0,safeCellsRevealed:0,result:null}},H={opened:!1,mine:!1,minesAround:0,flagged:!1,defused:!1,blownUp:!1,rightFlagged:!1,wrongFlagged:!1},N=(n(28),function(e){var t=e.selectedDifficulty,n=e.changeDifficulty;return Object(b.jsx)("div",{className:"diff-select",onChange:function(e){n(e.target.value)},children:C.map((function(e){return Object(b.jsx)(k,Object(d.a)(Object(d.a)({},e),{},{selected:t===e.value}),e.value)}))})}),A=(n(29),function(e){var t=e.bestTime,n=e.gamesPlayed,a=e.gamesWon,l=e.longestWinStreak,i=e.longestLoseStreak,s=e.currentWinStreak;return Object(b.jsxs)("div",{className:"diff-history",children:[Object(b.jsxs)("p",{children:[Object(b.jsx)("span",{children:"Best time:"}),Object(b.jsx)("span",{children:t&&t<1/0?t:"-"})]}),Object(b.jsxs)("p",{children:[Object(b.jsx)("span",{children:"Games played:"}),Object(b.jsx)("span",{children:n||0})]}),Object(b.jsxs)("p",{children:[Object(b.jsx)("span",{children:"Games won:"}),Object(b.jsx)("span",{children:a||0})]}),Object(b.jsxs)("p",{children:[Object(b.jsx)("span",{children:"Percentage:"}),Object(b.jsx)("span",{children:a&&n?"".concat(Math.round(a/n*100),"%"):"0%"})]}),Object(b.jsxs)("p",{children:[Object(b.jsx)("span",{children:"Longest winning streak:"}),Object(b.jsx)("span",{children:l||0})]}),Object(b.jsxs)("p",{children:[Object(b.jsx)("span",{children:"Longest loosing streak:"}),Object(b.jsx)("span",{children:i||0})]}),Object(b.jsxs)("p",{children:[Object(b.jsx)("span",{children:"Current winning streak:"}),Object(b.jsx)("span",{children:s||0})]})]})}),T=(n(30),function(e){var t=e.difficulty,n=e.history,a=e.changeDifficulty,l=e.returnHandler;return Object(b.jsx)("section",{className:"settings",children:Object(b.jsxs)("div",{className:"settings__content",children:[Object(b.jsx)("button",{className:"settings__return","aria-label":"Return to menu",onClick:l,children:Object(b.jsx)("span",{})}),Object(b.jsx)("h2",{className:"settings__title",children:"Settings"}),Object(b.jsx)("p",{className:"settings__warn",children:"For more experience with other difficulty levels you can visit this application web page on PC."}),Object(b.jsx)(N,{selectedDifficulty:t,changeDifficulty:a}),Object(b.jsx)(A,Object(d.a)({},n))]})})}),L=function(){return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)("div",{children:[Object(b.jsx)("p",{children:"Minesweeper - is a logic game where mines are hidden in a grid of squares. The objective is to open all safe squares in the quickest time possible."}),Object(b.jsx)("p",{children:"Sounds pretty simple, right?.."})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)("h3",{children:"Game board"}),Object(b.jsx)("p",{children:"There are two levels of difficulty available in mobile version, and three - in desktop."}),Object(b.jsxs)("div",{children:[Object(b.jsx)("p",{children:"Mobile:"}),Object(b.jsxs)("ul",{children:[Object(b.jsxs)("li",{children:[Object(b.jsx)("b",{children:"Beginner:"})," 81 cells, 10 mines"]}),Object(b.jsxs)("li",{children:[Object(b.jsx)("b",{children:"Amateur:"})," 144 cells, 20 mines"]})]})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)("p",{children:"Desktop:"}),Object(b.jsxs)("ul",{children:[Object(b.jsxs)("li",{children:[Object(b.jsx)("b",{children:"Beginner:"})," 81 cells, 10 mines"]}),Object(b.jsxs)("li",{children:[Object(b.jsx)("b",{children:"Intermediate:"})," 256 cells, 40 mines"]}),Object(b.jsxs)("li",{children:[Object(b.jsx)("b",{children:"Expert:"})," 480 cells, 99 mines"]})]})]}),Object(b.jsxs)("p",{children:["To start a new game with another level, switch ",Object(b.jsx)("b",{children:"Settings"})," in application menu and select difficulty you want."]})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)("h3",{children:"Game rules"}),Object(b.jsx)("p",{children:"So, rules in Minesweeper are very easy:"}),Object(b.jsxs)("ul",{children:[Object(b.jsx)("li",{children:"Cell with mine opened - game lost."}),Object(b.jsx)("li",{children:"Empty cell opened - game continues."}),Object(b.jsx)("li",{children:"If cell contains a number - it shows how many mines are hidden in the eight cells around. This number helps determine where the safe cells are."})]})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)("h3",{children:"Tips and hints"}),Object(b.jsxs)("ul",{children:[Object(b.jsxs)("li",{children:[Object(b.jsx)("b",{children:"Mark cells with mines."})," If a cell is supposed to contain a mine - click it with the right mouse button, or hold your touch on the cell for a while, if you are a smartphone or a tablet user. The cell will be marked with a flag."]}),Object(b.jsxs)("li",{children:[Object(b.jsx)("b",{children:"Explore and memorise possible combinations."})," If three cells in a row contain the numbers 2-3-2, you can assume that there are three mines along those cells. If a cell contains the number 8, then all cells around it contain mines."]}),Object(b.jsxs)("li",{children:[Object(b.jsx)("b",{children:"Try to open up unexplored grid areas."})," Not sure which cell to open next? Try to open another part of the field. It is better to open unexplored areas than those where you have a 50/50 chance to stumble upon a mine."]})]})]})]})},I=(n(31),function(e){var t=e.exitHandler;return Object(b.jsxs)("section",{className:"tutorial",children:[Object(b.jsx)("button",{className:"tutorial__exit","aria-label":"Exit tutorial",onClick:t}),Object(b.jsx)("h2",{className:"tutorial__title",children:"Tutorial"}),Object(b.jsx)("div",{className:"tutorial__content",children:Object(b.jsx)(L,{})})]})}),B=(n(32),function(){return Object(b.jsxs)("div",{className:"rotate-blocker",children:[Object(b.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAQAAACTbf5ZAAAEiUlEQVR42u2dIWzqThzHPwmiSUNShyATCARmFoWrQ73M4EhIEBUIkhkMjuWRBTeDQJQEgSABQTIxg0Atf4FBTGAwCBSCBLHk/nnNBbLxSpcNStt3n69awtF+dteD/Xa9olAovkeSPDXajHnljSVL3pjxQpc6BdJEBoMCNkuERzaMqJAixGjcMWa3V9rySo8HqhQpUKCIRZ02E1YcxF+pYBA6DGqs9qJDKtwSw50bCrRZ7lu0wzTI4zTYOCf+zog7dL5Olqd92144BnhZ9uyGR5J8B50Sb1K6RZwAk2Eqh2QDg58Qo8DCea8leQJAjBY1PmLJCapHknOgcc/WeccOOlcm45yIDpI4A9kfJuckybPzvnMyXJVb5zTi4JBm7vzcx+DsyJGzIY8LfgtnWTsTjHXBoy2cI1RwwU9h07nO1uS4JAk5HdY5wl/hvDPclj5cYZqcJRr4zkE47/Tughv8IIbtHLWG70hhP3Wlcs85bhm/kcKCFWn8JMbQmb5MDvgqvGa+z4QEl0fnFcEEn7lBcBwTP0jQxsR3TMqf8guFQqFQKBQKheKINGWatEOaR8qk+DImU0QEMsXEEx1bvnzJmC52KDNiKS06aKd1J87LnskSdnK8OC6TU8p9WW6NChXeEXRx4ZdnvShJj1Fg0yfNZyxZbPwrMwQDTlEJxGTknibHjBDM4Jis0yTDKaoIVjQDmTcELdfq2y1H1ORvwkv4P4LJwEUY5gjuOaKLoB1JYRtB5+9j/SGSwo8IhhwxRtCIpHATwUgJK2ElrISDhRJWwkpYCf9bwiZtJrzwQCr6wrrTXIYd1agLj2X5q05TLuK1oiz8sbal0UewxYiu8OhTbUtnjaAcXeEFguJR+fZJCQeLHwgPP5VE4lEf0nkEgsqHZbubKE9ayE/hKQ1a8t9SpSh/LIFGF7HPFivqXzwAsrQYM6RGMvpfLf/JPx6UsBIOFkpYCSthJayElXCA8BBWSx7oIuhEUtj+Y6aWLcmFabeewitagYzHwjS3pYfDyC09HLuOSlmAt3Angc0gsOmRcumiPC705F4KUaHKOwLbe4H4CznCTo4X6aJxAo0OwskqtLcAdBmzkhZtNDwxmQRiCvppJph8mRQlfgfilpzv5DelcOzFpVAoFAqFQqHwmwQ3n6LjOylscvhBFXGUNQY+U0ewIcNl8C4sZfCZBEsES5K+Duk0s2sJwy0bBHMS+IXG+Eo9LMmxlcp+6j5eTxhMdggWpLg0hqxRNTCuKLzfqnVFlktyI6/dOlxX+LAZ744SlyJ32O43CMKQktst28Q5NzHqvCO3Ww6KMMTpI5yrOXeRTdjnZCBIwgAWW9nPCc6BToOdrC7rHIgxZYZOAEjLivaGOgY/QcNiFaRN8d0pspLSDyT5DgZVFvKOqWYwevI0OvVvPtgihkmHrWxrh6mYblDj8CCSseejS9IU6bLet3gK06NLkMTIM2CHkNkxo88j95QpUqBEhQZdpmw+bPtlhfHhNAfi3NFhgfDImgEWSSJDApMqT4yYMmfBgjdeeaZDjbswXa0KRaD4H00Xj4fYuJVMAAAAAElFTkSuQmCC",alt:""}),Object(b.jsxs)("p",{className:"rotate-blocker__alert",children:["To allow application work properly,",Object(b.jsx)("br",{}),"please, rotate your screen",Object(b.jsx)("br",{}),"to a portrait orientation"]})]})}),E=(n(33),function(e){var t=e.result,n=e.timeProceed,a=e.history,l=new Date,i=l.getDate()>9?l.getDate():"0".concat(l.getDate()),s=l.getMonth()+1>9?l.getMonth()+1:"0".concat(l.getMonth()+1),c=a.bestTime,r=a.gamesPlayed,o=a.gamesWon;return Object(b.jsxs)("div",{className:"result",children:[Object(b.jsx)("p",{children:"win"===t?"Congratulations, you won!":Object(b.jsxs)("span",{children:["Sorry, you lost this game.",Object(b.jsx)("br",{}),"Better luck next time!"]})}),"win"===t&&n===c?Object(b.jsx)("p",{children:"You've showed your best time for this level of difficulty!"}):null,Object(b.jsxs)("div",{className:"result__stats",children:[Object(b.jsxs)("p",{children:["Time: ",n," seconds"]}),Object(b.jsxs)("p",{children:["Date: ","".concat(i,".").concat(s,".").concat(l.getFullYear())]})]}),Object(b.jsxs)("div",{children:[c&&c<1/0?Object(b.jsx)("div",{className:"result__stats result__stats--history",children:Object(b.jsxs)("p",{children:["Best time: ",c," seconds"]})}):null,Object(b.jsx)("div",{className:"result__stats result__stats--history",children:Object(b.jsxs)("p",{children:["Games played: ",r]})}),Object(b.jsxs)("div",{className:"result__stats result__stats--history",children:[Object(b.jsxs)("p",{children:["Games won: ",o]}),Object(b.jsxs)("p",{children:["Percentage: ",Math.round(o/r*100),"%"]})]})]})]})}),P=(n(34),function(e){var t=e.version;return Object(b.jsxs)("div",{className:"update-static",children:[Object(b.jsx)("h2",{className:"update-static__title",children:"Application Update"}),Object(b.jsxs)("h3",{children:["New version ",t," is already there!",Object(b.jsx)("br",{}),"What's new?"]}),Object(b.jsx)("ul",{children:Object(b.jsxs)("li",{children:[Object(b.jsx)("b",{children:"Application update procedure:"})," after receiving new update, you'll be redirected to a static page, where you'll need to confirm new version installation.",Object(b.jsx)("br",{}),Object(b.jsx)("i",{children:"Or you can just reload application web page ;)"})]})})]})}),D=(n(35),function(e){var t=e.content,n=e.updateVersion,a=e.result,l=e.timeProceed,i=e.history,s=e.hideModalHandler,c=e.btn1Name,r=e.btn1Action,o=e.btn2Name,d=e.btn2Action;return Object(b.jsx)("div",{className:"modal",children:Object(b.jsxs)("div",{className:"modal__window".concat(s?"":" modal__window--no-close")+"".concat(n?" modal__window--update":""),children:[s?Object(b.jsx)("button",{className:"modal__close","aria-label":"Close modal window",onClick:s}):null,t?Object(b.jsx)("p",{className:"modal__txt",children:t}):n?Object(b.jsx)(P,{version:n}):Object(b.jsx)(E,{result:a,timeProceed:l,history:i}),c&&r?Object(b.jsxs)("div",{className:"modal__btn-wrap",children:[Object(b.jsx)("button",{className:"modal__btn",onClick:r,children:c}),o&&d?Object(b.jsx)("button",{className:"modal__btn",onClick:d,children:o}):null]}):null]})})}),W=(n(36),function(e){var t=e.loaderState;return Object(b.jsx)("div",{className:"loader".concat("hidden"===t?" loader--hidden":""),children:Object(b.jsx)("div",{className:"loader__spinner",children:Object(b.jsx)("div",{className:"loader__spinner-inner",children:Object(b.jsx)("div",{})})})})}),F=(n(37),function(e){Object(h.a)(n,e);var t=Object(g.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).initTimer=function(){a.timerInterval=setInterval((function(){a.setState((function(e){return{game:Object(d.a)(Object(d.a)({},e.game),{},{timeProceed:e.game.timeProceed+1})}}))}),1e3)},a.setWinState=function(){a.pauseTimer(),a.setState((function(e){return{game:Object(d.a)(Object(d.a)({},e.game),{},{inProgress:!1,result:"win"})}})),a.setHistoryState(!0),a.defuseMines(),setTimeout((function(){a.switchModalHandler("result")}),5e3)},a.setLoseState=function(e,t){a.pauseTimer(),a.setState((function(e){return{game:Object(d.a)(Object(d.a)({},e.game),{},{inProgress:!1,result:"lose"})}})),a.setHistoryState(!1),a.revealMinesWhenLost(e,t),setTimeout((function(){a.switchModalHandler("result")}),4e3)},a.setHistoryState=function(e){a.setState((function(t){var n=t.history[t.game.difficulty]||M,a={bestTime:e&&t.game.timeProceed<n.bestTime?t.game.timeProceed:n.bestTime,gamesPlayed:n.gamesPlayed+1,gamesWon:e?n.gamesWon+1:n.gamesWon,longestWinStreak:e&&n.longestWinStreak===n.currentWinStreak?n.longestWinStreak+1:n.longestWinStreak,longestLoseStreak:e||n.longestLoseStreak!==n.currentLoseStreak?n.longestLoseStreak:n.longestLoseStreak+1,currentWinStreak:e?n.currentWinStreak+1:0,currentLoseStreak:e?0:n.currentLoseStreak+1},l=Object(d.a)(Object(d.a)({},t.history),{},Object(o.a)({},t.game.difficulty,a));return localStorage.setItem("_hv-m-h",JSON.stringify(l)),{history:l}}))},a.switchBlockHandler=function(e){"new-game"===e&&a.resetGameData(),a.setState({displayedBlock:e})},a.switchModalHandler=function(e){a.setState({displayedModal:e})},a.toggleModalVisibilityHandler=function(e){a.setState({modalHidden:e})},a.leaveGameHandler=function(){a.state.game.inProgress?a.switchModalHandler("leave-confirm"):a.enterMenuWithoutModal()},a.leaveGameConfirm=function(){a.enterMenuWithoutModal(),a.setHistoryState(!1),a.setState((function(e){return{game:Object(d.a)(Object(d.a)({},e.game),{},{inProgress:!1})}})),clearInterval(a.timerInterval)},a.continueGameConfirm=function(){a.switchModalHandler(""),a.runTimer()},a.confirmUpdateNotification=function(){a.switchModalHandler(""),localStorage.setItem("_hv-m-n","seen")},a.enterMenuWithoutModal=function(){a.switchBlockHandler("menu"),a.switchModalHandler(""),a.toggleModalVisibilityHandler(!1)},a.prepareNewGame=function(){a.resetGameData(),a.switchModalHandler("")},a.resetGameData=function(){a.setState((function(e){return{game:Object(d.a)(Object(d.a)({},e.game),{},{cells:a.generateCellsEmptyData(e.game.cols,e.game.rows),started:!1,inProgress:!1,timeProceed:0,flaggedAmount:0,safeCellsRevealed:0,result:null})}}))},a.generateCellsEmptyData=function(e,t){for(var n=[],a=0;a<e;a++){for(var l=[],i=0;i<t;i++)l.push(H);n.push(l)}return n},a.changeDifficulty=function(e){var t=/(\d+)x(\d+)/.exec(e),n=Object(r.a)(t,3),l=n[1],i=n[2];a.setGameLayoutMode(window.innerHeight,window.innerWidth,l,i),a.setState((function(t){return{game:Object(d.a)(Object(d.a)({},t.game),{},{cols:parseInt(l),rows:parseInt(i),cells:a.generateCellsEmptyData(l,i),difficulty:e})}}))},a.toggleFlagMode=function(){a.setState((function(e){return{flagMode:!e.flagMode}}))},a.setMines=function(e,t){a.setState((function(n){for(var l={},i=0;i<a.minesAmount[n.game.difficulty];){var s=Math.floor(Math.random()*n.game.cols),c=Math.floor(Math.random()*n.game.rows),r="".concat(s,"x").concat(c);r in l||e-2<s&&e+2>s&&t-2<c&&t+2>c||(l[r]=!0,i+=1)}var o=n.game.cells.map((function(e,t){return e.map((function(e,n){return"".concat(t,"x").concat(n)in l?Object(d.a)(Object(d.a)({},e),{},{mine:!0}):e}))}));return{game:Object(d.a)(Object(d.a)({},n.game),{},{cells:o})}}))},a.startGame=function(e,t){a.setMines(e,t),a.setState((function(e){return{game:Object(d.a)(Object(d.a)({},e.game),{},{started:!0,inProgress:!0})}})),a.runTimer(!0),a.setRevealedCellsState(e,t)},a.clickOnCellHandler=function(e,t){var n=a.state,l=n.flagMode,i=n.game,s=i.inProgress,c=i.cells,r=i.safeCellsRevealed,o=c[e][t];s||0!==r?s&&l?a.toggleFlagOnCellHandler(e,t):s&&!o.flagged&&!o.opened&&o.mine?a.setLoseState(e,t):s&&a.setRevealedCellsState(e,t):a.startGame(e,t)},a.revealCell=function(e,t,n){var l=Object(d.a)({},e),i=Object(c.a)(l.cells);if(i[t]&&i[t][n]&&!i[t][n].opened&&!i[t][n].flagged){i[t][n]=Object(d.a)(Object(d.a)({},i[t][n]),{},{opened:!0}),l=Object(d.a)(Object(d.a)({},l),{},{cells:i});var s=a.countMinesAround(i,t,n);return 0===s?Object(d.a)(Object(d.a)(Object(d.a)(Object(d.a)(Object(d.a)(Object(d.a)(Object(d.a)(Object(d.a)({},a.revealCell(l,t-1,n-1)),a.revealCell(l,t,n-1)),a.revealCell(l,t+1,n-1)),a.revealCell(l,t-1,n)),a.revealCell(l,t+1,n)),a.revealCell(l,t-1,n+1)),a.revealCell(l,t,n+1)),a.revealCell(l,t+1,n+1)):((i=Object(c.a)(l.cells))[t][n]=Object(d.a)(Object(d.a)({},i[t][n]),{},{minesAround:s}),Object(d.a)(Object(d.a)({},l),{},{cells:i}))}return e},a.setRevealedCellsState=function(e,t){a.setState((function(n){var l=a.revealCell(Object(d.a)({},n.game),e,t),i=0;return l.cells.forEach((function(e){e.forEach((function(e){e.opened&&!e.mine&&(i+=1)}))})),{game:Object(d.a)(Object(d.a)({},l),{},{safeCellsRevealed:i})}}))},a.defuseMines=function(){a.setState((function(e){var t=e.game.cells.map((function(e){return e.map((function(e){return e.mine?Object(d.a)(Object(d.a)({},e),{},{opened:!0,defused:!0}):e}))}));return{game:Object(d.a)(Object(d.a)({},e.game),{},{cells:t})}}))},a.revealMinesWhenLost=function(e,t){a.setState((function(n){var a=n.game.cells.map((function(n,a){return n.map((function(n,l){return e===a&&t===l?Object(d.a)(Object(d.a)({},n),{},{opened:!0,blownUp:!0}):n.mine?Object(d.a)(Object(d.a)({},n),{},{opened:!0,rightFlagged:!0}):n.flagged&&!n.mine?Object(d.a)(Object(d.a)({},n),{},{opened:!0,wrongFlagged:!0}):n}))}));return{game:Object(d.a)(Object(d.a)({},n.game),{},{cells:a})}}))},a.countMinesAround=function(e,t,n){for(var a=0,l=-1;l<2;l++)if(e[t+l])for(var i=-1;i<2;i++)e[t+l][n+i]&&e[t+l][n+i].mine&&(a+=1);return a},a.toggleFlagOnCellHandler=function(e,t){a.state.game.inProgress&&a.setState((function(n){var a=1,l=n.game.cells.map((function(n,l){return n.map((function(n,i){return e===l&&t===i?(n.flagged&&(a=-1),Object(d.a)(Object(d.a)({},n),{},{flagged:!n.flagged})):n}))}));return{game:Object(d.a)(Object(d.a)({},n.game),{},{cells:l,flaggedAmount:n.game.flaggedAmount+a})}}))},a.setGameLayoutMode=function(e,t,n,l){a.setState({gameLayoutMode:e<568&&l>9?"game--r16-568":t<768&&n>16?"game--c30-768":t<992&&n>16?"game--c30-992":""})},a.setLoaderState=function(e){a.setState({loaderState:e})},a.version="0.5.9",a.state={loaderState:"visible",modalHidden:!1,displayedBlock:"",displayedModal:"",flagMode:!1,game:localStorage.getItem("_hv-m-v")!==a.version?_(a.generateCellsEmptyData(9,9)):JSON.parse(localStorage.getItem("_hv-m-g"))||_(a.generateCellsEmptyData(9,9)),history:JSON.parse(localStorage.getItem("_hv-m-h"),(function(e,t){return null===t?1/0:t}))||{"9x9":M}},a.minesAmount=S,a.gameLayoutMode="",a.timerInterval=null,a.resizeAppBlock=a.resizeAppBlock.bind(Object(j.a)(a)),a.runTimer=a.runTimer.bind(Object(j.a)(a)),a.pauseTimer=a.pauseTimer.bind(Object(j.a)(a)),a}return Object(m.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.state.game.inProgress&&(this.switchBlockHandler("game"),this.switchModalHandler("unfinished")),localStorage.getItem("_hv-m-v")===this.version&&localStorage.getItem("_hv-m-n")||(this.switchModalHandler("update"),localStorage.removeItem("_hv-m-n"),localStorage.setItem("_hv-m-v",this.version)),this.resizeAppBlock(),window.addEventListener("resize",this.resizeAppBlock),setTimeout((function(){e.setLoaderState("hidden")}),500)}},{key:"componentDidUpdate",value:function(){var e=this.state.game,t=e.rows,n=e.cols,a=e.safeCellsRevealed,l=e.difficulty,i=e.inProgress;t*n-a===this.minesAmount[l]&&i&&this.setWinState(),localStorage.setItem("_hv-m-g",JSON.stringify(this.state.game))}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.resizeAppBlock)}},{key:"resizeAppBlock",value:function(){this.appRef.style.height="".concat(window.innerHeight,"px"),this.setGameLayoutMode(window.innerHeight,window.innerWidth,this.state.game.cols,this.state.game.rows)}},{key:"runTimer",value:function(e){window.removeEventListener("focus",this.runTimer),window.addEventListener("blur",this.pauseTimer),(!0===e||this.state.game.inProgress)&&this.initTimer()}},{key:"pauseTimer",value:function(){window.removeEventListener("blur",this.pauseTimer),window.addEventListener("focus",this.runTimer),clearInterval(this.timerInterval)}},{key:"render",value:function(){var e=this,t=this.state,n=t.displayedBlock,a=t.flagMode,l=t.gameLayoutMode,i=t.displayedModal,s=t.loaderState,c=t.modalHidden,r=t.game,o=r.difficulty,d=r.timeProceed,u=r.cols,m=r.rows,j=r.cells,h=r.started,g=r.inProgress,f=r.flaggedAmount,p=r.result,x=this.minesAmount[o]-f,v=this.state.history[o];return Object(b.jsxs)("main",{className:"app".concat(c?" app--modal-hidden":""),ref:function(t){return e.appRef=t},children:[Object(b.jsx)("div",{className:"app__container",children:n.includes("game","new-game")?Object(b.jsx)(y,{layoutMode:l,started:h,inProgress:g,cols:u,rows:m,cells:j,timeProceed:d,flagMode:a,minesLeft:x,leaveGameHandler:this.leaveGameHandler,toggleFlagMode:this.toggleFlagMode,clickOnCellHandler:this.clickOnCellHandler,toggleFlagOnCellHandler:this.toggleFlagOnCellHandler}):"settings"===n?Object(b.jsx)(T,{difficulty:o,history:v,changeDifficulty:this.changeDifficulty,returnHandler:function(){e.switchBlockHandler("menu")}}):"tutorial"===n?Object(b.jsx)(I,{exitHandler:function(){e.switchBlockHandler("menu")}}):Object(b.jsx)(O,{switchBlockHandler:this.switchBlockHandler})}),Object(b.jsx)(B,{}),"leave-confirm"===i?Object(b.jsx)(D,{content:"Are you sure you want to leave to menu? Game progress will be lost.",btn1Name:"Stay",btn2Name:"Leave",btn1Action:function(){e.switchModalHandler("")},btn2Action:this.leaveGameConfirm.bind(this),hideModalHandler:function(){e.switchModalHandler("")}}):"unfinished"===i?Object(b.jsx)(D,{content:"You have an unfinished game. Would you like to continue?",btn1Name:"Continue",btn2Name:"To Menu",btn1Action:this.continueGameConfirm.bind(this),btn2Action:this.leaveGameConfirm.bind(this)}):"result"===i?Object(b.jsx)(D,{result:p,timeProceed:d,history:v,btn1Name:"New Game",btn2Name:"To Menu",btn1Action:this.prepareNewGame.bind(this),btn2Action:this.enterMenuWithoutModal.bind(this),hideModalHandler:function(){e.toggleModalVisibilityHandler(!0)}}):"update"===i?Object(b.jsx)(D,{updateVersion:this.version,btn1Name:"Confirm",btn1Action:this.confirmUpdateNotification.bind(this),hideModalHandler:this.confirmUpdateNotification.bind(this)}):null,Object(b.jsx)(W,{loaderState:s}),Object(b.jsx)("button",{className:"app__modal-btn","aria-label":"Show modal window again",onClick:function(){e.toggleModalVisibilityHandler(!1)}})]})}}]),n}(a.Component)),G=(n(38),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function J(e){navigator.serviceWorker.register(e,{scope:"".concat("/Minesweeper","/")}).then((function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.debug("New content is available; please refresh."):console.debug("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}s.a.render(Object(b.jsx)(l.a.StrictMode,{children:Object(b.jsx)(F,{})}),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/Minesweeper",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/Minesweeper","/sw.js");G?function(e){fetch(e).then((function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):J(e)})).catch((function(){console.debug("No internet connection found. App is running in offline mode.")}))}(e):J(e)}))}}()}]),[[39,1,2]]]);
//# sourceMappingURL=main.d1125a8f.chunk.js.map