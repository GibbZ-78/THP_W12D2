// Bibliothèque de gestion du système de fichiers
const fs = require('fs');

// Récupération du nom du fichier, passé en paramètre
// argv[0] = node, argv[1] = nom du script JS, argv[2] = nom du fichier
const fileName = process.argv[2];

// Variables globales permettant de repartir du tableau initial à chaque fois
let myBubbleTab = [];
let myInsertTab = [];
let mySelectTab = [];
let myQuickTab = [];

// Echange la position de 2 éléments "a" et "b" d'un tableau "tab"
function swapIntInTab(tab,a,b) {
  let tmp = tab[b];
  tab[b] = tab[a];
  tab[a] = tmp;
}

// Fonction de tri à bulles
function bubbleSort(myArray) {
  console.log("\n*** BUBBLE SORT ***");
  let myCounter = 0;
  for (let i = 0; i < myArray.length; i++) {
    for (let j = 0; j < myArray.length-1; j++) {
      if (myArray[j] > myArray[j+1]) {
        swapIntInTab(myArray,j,j+1);
      }
      myCounter++;
      console.log("  > Tour n°"+myCounter+" : tableau résultant = "+myArray);
      
    }
  }
  console.log("Bubble sort done in "+ myCounter + " turns")
  console.log("Tableau classé par ordre croissant :");
  console.log(myArray);
}

// Fonction de tri par insertion
function insertSort(myArray) {
  console.log("\n*** INSERT SORT ***");
  let myCounter = 0;
  let tmpArray = [];
  let myPath = "";
  //tmpArray.push(myArray[0]);
  for (let i = 0; i < myArray.length; i++) {
    let j = 0;
    while (tmpArray[j] < myArray[i] && j < tmpArray.length) {
      j++;
    }
    if (j>=tmpArray.length) {
      tmpArray.push(myArray[i]);
      myPath = "push";
    } else {
      tmpArray.splice(j, 0, myArray[i]);
      myPath = "splice";
    }
    myCounter++;
    console.log("  > Tour n°"+myCounter+" : chemin = "+myPath+" - tableau résultant = "+tmpArray);
  }
  console.log("Initial table: "+myArray);
  myArray = tmpArray;
  console.log("Insert sort done in "+ myCounter + " turns")
  console.log("Tableau classé par ordre croissant :");
  console.log(myArray);
}

// Fonction de tri par sélection
function selectSort(myArray) {
  console.log("\n*** SELECT SORT ***");
  let myCounter = 0;
  let myMinIndex = 0;
  console.log("Initial table: "+myArray);
  for (let i = 0; i < myArray.length; i++) {
    myMinIndex = i;
    for (let j = i+1; j < myArray.length; j++) {
      if (myArray[j] < myArray[myMinIndex]) {
        myMinIndex = j;
      }
      myCounter++;
      console.log("  > Tour n°"+myCounter+" : tableau résultant = "+myArray);
    }
    if (myMinIndex != i) {
      swapIntInTab(myArray,i,myMinIndex)  // Prevent to switch a position with itself (ex. end of array)
    }
  }
  console.log("Select sort done in "+ myCounter + " turns")
  console.log("Tableau classé par ordre croissant :");
  console.log(myArray);
}

// Split du tableau en 2 sous-tableaux entourant la valeur pivot
function equalDistribution(myTab,s,e) {
  let tmpTabInf = [];
  let tmpTabSup = [];
  let myPivotPos = s;
  for (let index = 0; index < myTab.length; index++) {
    if (myTab[index] >= myTab[myPivotPos]) {
      tmpTabSup.push(myTab[index]);
    } else {
      tmpTabInf.push(myTab[index]);
    }
  }
  console.log("TabInf:" +tmpTabInf);
  console.log("TabSup:" +tmpTabSup);
  myTab = tmpTabInf.concat(tmpTabSup);
  console.log("  > Tableau distribué autour du pivot "+myTab[tmpTabInf.length]+" ("+tmpTabInf.length+") :");
  console.log(myTab);
  myTab.unshift(tmpTabInf.length);
  console.log("  > equalDistribution renvoie : "+myTab+".");
  return myTab;
}

// Sous-fonction récursive de tri rapide
function qSort(myArray, myStart, myEnd) {
  if (myStart < myEnd) {
    let myRecArray = equalDistribution(myArray, myStart, myEnd);
    let myPivot = myRecArray.shift();
    myRecCounter++
    console.log("  > Tour n°"+myRecCounter+" : tableau résultant = "+myRecArray);
    qSort(myRecArray, myStart, myPivot-1);
    qSort(myRecArray, myPivot+1, myEnd);
  }
}

// Fonction de lancement du tri rapide récursif
function quickSort(myQTab) {
  console.log("\n*** QUICK SORT ***");
  console.log("Tableau original: " + myQTab);
  let myFinalTab = qSort(myQTab,0,myQTab.length-1);
  console.log("Quick sort done in "+ myRecCounter + " turns")
  console.log("Tableau classé par ordre croissant :");
  console.log(myFinalTab);
}

// Programme principal
// Méthode de lecture du fichier SYNCHRONE (i.e. bloquante mais, surtout, séquentielle)
 try {
  const data = fs.readFileSync(fileName, 'utf8');
  console.log("Raw data read from command line: "+data);
  myBubbleTab = data.split(' ').map(elem => parseInt(elem,10));
  myInsertTab = data.split(' ').map(elem => parseInt(elem,10));
  mySelectTab = data.split(' ').map(elem => parseInt(elem,10));
  myQuickTab = data.split(' ').map(elem => parseInt(elem,10));
  console.log("Integered and arrayed data for BUBBLE sort: "+myBubbleTab);
  console.log("Integered and arrayed data for INSERT sort: "+myInsertTab);
  console.log("Integered and arrayed data for SELECT sort: "+mySelectTab);
  console.log("Integered and arrayed data for QUICK sort: "+myQuickTab);
 } catch (error) {
  console.error(error.message);
 }

// Méthode de lecture du fichier ASYNCHRONE (non-bloquante, mais en // >> "data" peut ne pas être encore définie...)
// fs.readFile(fileName, 'utf8', (error, data) => {
//     if (error) {
//         console.error(error.message);
//         return ;
//     }
//     console.log(data);
//     myArgsTab = data.split(' ').map(elem => parseInt(elem,10));
//     console.log(myArgsTab);
// });

bubbleSort(myBubbleTab);
insertSort(myInsertTab);
selectSort(mySelectTab)
let myRecCounter = 0;
quickSort(myQuickTab);
