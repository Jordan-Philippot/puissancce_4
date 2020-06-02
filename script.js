(function ($) {

    $.fn.puissance4 = function (identif, colonnes, ligne) {

        class game {
            constructor(structure, col, row) {
                this.rows = row;
                this.cols = col;
                this.structure = structure;
            }

            Grid() {
                const gamegrid = $(this.structure);
                let div = "";
                for (let row = 0; row < this.rows; row++) {                     // JE CONCATÈNE MES DIV: <row> -> <col> -> </row>
                    div += '<div class="row" data-row="' + row + '">';
                    for (let col = 0; col < this.cols; col++) {
                        div += `<div class="col" data-row="${row}" data-column="${col}"></div>`;  // JE RECUPERE LA POSITION DE MA CELLULE AVEC SES DATA RANGÉ ET COLONNE
                    }
                    div += '</div>';
                }
                gamegrid.append(div);
            }
        }
        let mygame = new game(identif, colonnes, ligne);                          // LES PARAMÈTRES SONT LES MÊMES QU'A L'APPELLE DU PLUG-IN JQUERY
        mygame.Grid();                                                            // ET J'APPELLE MA FONCTION(ici ou dans le construct )

        let myArray = new Array(ligne);
        for (let i = 0; i < myArray.length; i++) {                                // NOUVEAU TABLEAU (en console) DE LONGEUR COL ET ROW 
            myArray[i] = new Array(colonnes);
        }

        let playerYellow = '<div class="col-yellow"></div>';                      // MES COULEURS ET JOUEURS ASSOCIÉES
        let playerRed = '<div class="col-red"></div>';

        let playerColor1 = 'red';
        let playerColor2 = 'yellow';

        var cell = $('.col');
        let click = 0;

        $('#popup').hide();

        let pointWin1 = 0;
        let pointWin2 = 0;

        $(document).ready(function () {
            pointWin1 = localStorage.getItem('point1');
            pointWin2 = localStorage.getItem('point2');
            $('#point1').text(pointWin1);
            $('#point2').text(pointWin2);
        });

        $('.replay').click(function (e) {         // REPLAY (rafraichi la page pour le moment)
            location.reload(true);
        });

        $('.button_exit').click(function (e) {    // REMET LE COMPTEUR A ZERO (rafraichi la page aussi)
            pointWin1 = 0;
            localStorage.setItem('point1', pointWin1);
            pointWin2 = 0;
            localStorage.setItem('point2', pointWin2);
            location.reload(true);
        });

        $('.col-yellow').click(function () {                // SI JE CHOISI LES JAUNES
            let pseudo1 = $(".namePlayerRed").val();
            let pseudo2 = $(".namePlayerYellow").val();
            if ($(".namePlayerRed").val() == '' || $(".namePlayerYellow").val() == '') {
                pseudo1 = "Red";
                pseudo2 = "Yellow";
            }

            playerColor1 = 'yellow';                       // JE MODIFIE MES ASSOCIATIONS DE COULEURS -> JOUEURS PUISQUE C'EST TOUJOURS LES JOUEURS ROUGE QUI COMMENCENT
            playerColor2 = 'red';



            $(".color-player").animate({
                height: "30vh"
            }, 5000);

            $('#joueur').append('<div class="current"> <p class="tours"> Player\'s turn ' + pseudo1 + ': </p>' + playerRed + '</div>');
            $('.color-player').append('<div class="row justify-content-center"> <div class="alert alert-primary player" > <p class="whatColor" id="jaune"> Color of player ' + pseudo2 + ' : ' + playerYellow + '</p> </div> </div>  <div class="row justify-content-center">  <div class="alert alert-primary player"> <p>Color of player ' + pseudo1 + ' : ' + playerRed + '</p> </div> </div>');
            $('#structure').css('display', 'block');
            $('.hidden-color').css('display', 'none');
            $('#nbtours').css('display', 'block');
            $('#nbtours').text('Number of strokes : ' + click);
            $('#joueur').css('display', 'block');
            $('.replay').css('display', 'block');
            $('.exit').css('display', 'block');

            $('#victoire1').css('display', 'block');
            $('#victoire2').css('display', 'block');
        });


        $('.col-red').click(function () {                     // OU SI JE CHOISI LES ROUGES...
            let pseudo1 = $(".namePlayerRed").val();
            let pseudo2 = $(".namePlayerYellow").val();
            if ($(".namePlayerRed").val() == '' || $(".namePlayerYellow").val() == '') {
                pseudo1 = "Red";
                pseudo2 = "Yellow";
            }



            $(".color-player").animate({
                height: "30vh"
            }, 3000);

            $('#joueur').append('<div class="current"> <p class="tours"> Player\'s turn ' + pseudo1 + ': </p>' + playerRed + '</div>');
            $('.color-player').append('<div class="row justify-content-center"> <div class="alert alert-primary player"> <p class="whatColor" id="rouge"> Color of player ' + pseudo1 + ' : ' + playerRed + '</p > </div > </div > <div class="row justify-content-center">  <div class="alert alert-primary player"> <p> Color of player ' + pseudo2 + ' : ' + playerYellow + '</p> </div> </div>');
            $('#structure').css('display', 'block');            // Je montre mon puissance 4 une fois la couleur choisie
            $('.hidden-color').css('display', 'none');
            $('#nbtours').css('display', 'block');
            $('#nbtours').text('Number of strokes : ' + click);
            $('#joueur').css('display', 'block');
            $('.replay').css('display', 'block');
            $('.exit').css('display', 'block');

            $('#victoire1').css('display', 'block');
            $('#victoire2').css('display', 'block');            // ET JE CACHE LES CHOIX DES COULEURS
        });


        function position(col, color) {
            for (let i = myArray.length - 1; i >= 0; i--) {
                if (myArray[i][col] === undefined) {
                    myArray[i][col] = color;
                    let infos = {
                        row: i,
                        col: col,
                    };
                    return infos;
                }
            }
        }

        $(cell).click(function (e) {               // A CHAQUE CLIQUE D'UN DIV .COL
            let pseudo1 = $(".namePlayerRed").val();
            let pseudo2 = $(".namePlayerYellow").val();
            if ($(".namePlayerRed").val() == '' || $(".namePlayerYellow").val() == '') {
                pseudo1 = "Red";
                pseudo2 = "Yellow";
            }
            var column = $(this).data('column');      // JE PRENDS SA COLONNE
            click++;

            let currentPlayer = click % 2 === 0 ? "yellow" : "red";
            let win = click % 2 === 0 ? pseudo2 : pseudo1;
            var infos = position(column, currentPlayer);   // JE RENTRE COLONNE ET COULEUR EN PARAMÈTRES DE MON TABLEAU (fonction array)

            if (!infos) {                          // SI PLUS DE PLACE : ( infos != undefined)
                click--;
                alert("Column is full");
                return;
            }

            let cible = "[data-row = " + infos.row + "]>[data-column = " + infos.col + "]";  // On stock la position de ma .col avec les position de ma fonction
            $(cible).css('background-color', currentPlayer);

            if (click % 2 == 0) {
                $('.current').remove();            // SI PAIR -> YELLOW
                $('#joueur').append('<div class="current"> <p class="tours"> Player\'s turn ' + pseudo1 + ' : </p > ' + playerRed + '</div > ');
            } else {

                $('.current').remove();            //SI IMPAIR -> JOUEUR1 = ROUGE)
                $('#joueur').append('<div class="current"> <p class="tours"> Player\'s turn ' + pseudo2 + ' : </p>' + playerYellow + '</div>');
            }

            $('#nbtours').text('Number of strokes : ' + click);

            let countCible = 0;                    // VERTICALEMENT
            for (let i = 0; i < myArray.length && countCible != 4; i++) {
                if (currentPlayer === myArray[i][infos.col]) {
                    countCible++;
                } else {
                    countCible = 0;
                }
            }
            if (countCible != 4) {                //HORIZONTALEMENT
                countCible = 0;
                for (let i = 0; i <= myArray[infos.row].length - 1 && countCible != 4; i++) {
                    if (currentPlayer == myArray[infos.row][i]) {
                        countCible++;
                    } else {
                        countCible = 0;
                    }
                }
            }
            if (countCible != 4) {                 // DIAGONALES PENCHÉ À DROITE
                countCible = 0;
                let i, j;
                for (i = infos.row, j = infos.col; i > 0 && j <= colonnes; i-- , j++) {  // ON VAS EN HAUT À DROITE
                }
                for (i, j; i <= ligne + 1 && j >= 0 && countCible != 4; i++ , j--) { //ON VAS EN BAS À GAUCHE
                    if (currentPlayer == myArray[i][j]) {
                        countCible++;
                    }
                    else {
                        countCible = 0;
                    }
                }
            }
            if (countCible != 4) {                  // DIAGONALES PENCHÉ À GAUCHE
                countCible = 0;
                let i, j;
                for (i = infos.row, j = infos.col; i >= 0 && j >= 0; i-- , j--) {   // ON VAS EN HAUT À GAUCHE
                }
                for (++i, ++j; i <= ligne + 1 && j <= colonnes && countCible != 4; i++ , j++) {     //ON VAS EN BAS À DROITE
                    if (currentPlayer == myArray[i][j]) {
                        countCible++;
                    }
                    else {
                        countCible = 0;
                    }
                }
            }

            if (countCible === 4) {    // SI VICTOIRE
                $('#popup').show();
                alert(win + ' win!');

                if (typeof localStorage != 'undefined') {
                    if ($('#rouge').hasClass('whatColor') && currentPlayer == "red" || $('#jaune').hasClass('whatColor') && currentPlayer == "yellow") {
                        pointWin1 = localStorage.getItem('point1');
                        pointWin1++;
                        localStorage.setItem('point1', pointWin1);
                    }
                    else {
                        pointWin2 = localStorage.getItem('point2');
                        pointWin2++;
                        localStorage.setItem('point2', pointWin2);
                    }

                    $('#point1').text(pointWin1);            // SCORE PARTIE
                    $('#point2').text(pointWin2);
                } else {
                    alert("localStorage not supported");
                }
                $('#structure').css('cursor', 'not-allowed');
            }

            if (click == colonnes * ligne && countCible !== 4) { // MATCH NULL
                alert('Grid is full , Nobody Win!');
                $('#popup').show();
            }
        });
    };
})(jQuery);

$(document).ready(function () {
    $('body').puissance4("#structure", 6, 7);               // J'APPELLE MON PLUG-IN AVEC BODY ET JE LUI PASSE LES PARAMÈTRES SOUHAITÉ 
});