var quantidadeCaixa = 7;
var sleepTime = 500;
document.getElementById("Seleção").checked = true;

function updateSleepTime(slider)
{
	sleepTime = slider.value;
	document.getElementById("sliderValue").innerHTML = sleepTime;	
}

//randomizar números nas caixas
let numList = [];
for(let i = 0; i < quantidadeCaixa; i++)
{
	let caixaAtual = document.getElementById(i);
	let randomNum = Math.floor(Math.random() * 9);
	
	while(numList.indexOf(randomNum) != -1)
		randomNum = Math.floor(Math.random() * 9);
	
	numList.push(randomNum);
	caixaAtual.innerHTML = randomNum;	
}

function resetar()
{
	for(let i = 0; i < quantidadeCaixa; i++)	
	{
		document.getElementById(i).style.backgroundColor = "red";
		document.getElementById(i).innerHTML = numList[i];			
	}
}

var caixaCores = [];
function sleep(ms) {
	let difference = false;
	
	//checar se há diferença
	for(let i = 0; i < quantidadeCaixa; i++)
	{
		let caixaAtual = document.getElementById(i);
		let caixaValor = caixaAtual.innerHTML;
		let caixaColor = caixaAtual.style.color;
		let caixaBackgroundColor = caixaAtual.style.backgroundColor;		

		if(caixaCores.length != 0)
		{		
			if( (caixaCores[i][0] != caixaValor) || (caixaCores[i][1] != caixaColor) || (caixaCores[i][2] != caixaBackgroundColor) )
			{
				difference = true;
				break;				
			}
		}
		else
		{
			difference = true;
			break;
		}
	}
	
	if(difference)
	{
		caixaCores = [];
		for(let i = 0; i < quantidadeCaixa; i++)
		{
			let caixaAtual = document.getElementById(i);		
			let caixaValor = caixaAtual.innerHTML;
			let caixaColor = caixaAtual.style.color;
			let caixaBackgroundColor = caixaAtual.style.backgroundColor;	
			
			caixaCores.push([caixaValor, caixaColor, caixaBackgroundColor]);	
		}
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	
	return;
}

function editarNumero(caixa)
{
	let novoNumero = parseInt(prompt("Digite um número de 0 a 9:"));
	
	if(isNaN(novoNumero))
		return;
	else if(novoNumero < 0)
		novoNumero = 0;
	else if(novoNumero > 9)
		novoNumero = 9;
	
	caixa.innerHTML = novoNumero;
	numList[caixa.id] = novoNumero;
}

var botaoIniciar;
var botaoResetar;
function iniciarVisualizador(botaoIni)
{
	botaoIniciar = botaoIni;
	botaoResetar = document.getElementById("resetar");
	
	botaoIniciar.setAttributeNode(document.createAttribute("disabled"));
	botaoResetar.setAttributeNode(document.createAttribute("disabled"));
	
	for(let i = 0; i < quantidadeCaixa; i++)
	{
		let caixaAtual = document.getElementById(i);
		caixaAtual.style.backgroundColor = "red";
		caixaAtual.removeAttribute("onclick");		
	}
	caixaCores = [];

	let sortName = document.forms["sorts"]["sortName"].value;
	
	if(sortName == "Seleção")
		selection();
	else if(sortName == "Inserção")
		insertion();
	else if (sortName == "MergeSort")
		mergesort(0,quantidadeCaixa-1);
	else if (sortName == "QuickSort")
		quicksort(0,quantidadeCaixa-1);
	else if(sortName == "ShellSort")
		shellsort();
	else if(sortName == "HeapSort")
		heapsort();
}

function fimVisualizador()
{
	botaoIniciar.removeAttribute("disabled");	
	botaoResetar.removeAttribute("disabled");	
	
	for(let i = 0; i < quantidadeCaixa; i++)
	{
		let caixaAtual = document.getElementById(i);
		caixaAtual.style.backgroundColor = "green";
		
		let onclickAtt = document.createAttribute("onclick");
		onclickAtt.value = "editarNumero(this)";
		caixaAtual.setAttributeNode(onclickAtt);		
	}	
}

//Caixa Azul: Caixas selecionadas no momento
//Laranja: Menor número encontrado no momento
//Caixa Verde: Caixa posicionada no lugar correto

function trocarCaixa(pos,dest)
{
	if(pos == dest)
		return;
	
	let pos_num = pos.innerHTML;
	pos.innerHTML = dest.innerHTML;
	dest.innerHTML = pos_num;
	
	return;
}

async function selection()
{
	for(let i = 0; i < quantidadeCaixa-1; i++)
	{	
		let caixaComparada = document.getElementById(i);
			
		let menorCaixa = caixaComparada;	
		let menorNum = menorCaixa.innerHTML;
		
		menorCaixa.style.backgroundColor = "blue";
		menorCaixa.style.color = "orange";
		
		await sleep(sleepTime);

		for(let j = i+1; j < quantidadeCaixa; j++)
		{		
			caixaAtual = document.getElementById(j);				
			caixaNum = caixaAtual.innerHTML;
			
			caixaAtual.style.backgroundColor = "blue";
			
			if(caixaNum < menorNum)
			{	
				caixaAtual.style.color = "orange";
				menorCaixa.style.color = "white";
				
				menorCaixa = caixaAtual;
				menorNum = caixaNum;
			}
			
			await sleep(sleepTime);
			
			caixaAtual.style.backgroundColor = "red";	
		}
		
		trocarCaixa(menorCaixa, caixaComparada);
		
		caixaComparada.style.backgroundColor = "green";		
		menorCaixa.style.color = "white";		
	}
	
	await sleep(sleepTime);
	document.getElementById(quantidadeCaixa-1).style.backgroundColor = "green";
	fimVisualizador();
}

//Caixa Azul: Número sendo movido no momento
//Laranja: Posição inicial do número sendo movido
//Caixa Verde: Caixa posicionada no lugar correto

async function insertion()
{		
	for(let i = 1; i < quantidadeCaixa; i++)
	{		
		let caixaAtual = document.getElementById(i);
		
		caixaAtual.style.backgroundColor = "blue";
		caixaAtual.style.color = "orange";		
		
		await sleep(sleepTime);
		
		let caixaAtual_num = caixaAtual.innerHTML;
		let j = i;

		while( (j > 0) && (document.getElementById(j-1).innerHTML > caixaAtual_num) )
		{	
			let caixaMovAtual = document.getElementById(j);
	
			if(j!=i)
			{
				caixaMovAtual.style.backgroundColor = "blue";
				caixaMovAtual.innerHTML = caixaAtual_num; //mostra numero sendo movido
				await sleep(sleepTime);
			}			
			caixaMovAtual.style.backgroundColor = "red";
	
			caixaMovAtual.innerHTML = document.getElementById(j-1).innerHTML;		
			j--;	
		}
		
		document.getElementById(j).innerHTML = caixaAtual_num;
		
		document.getElementById(j).style.backgroundColor = "blue";	
		if(j != i)
		{
			caixaAtual.style.backgroundColor = "red";
			await sleep(sleepTime);
		}	
		document.getElementById(j).style.backgroundColor = "red";
		caixaAtual.style.color = "white";	
	}
		
	fimVisualizador();
}

//Caixa Azul e Laranja: Dois lados do merge
//Caixa Verde: Resultado do merge

function merge(e1,d1,e2,d2)
{		
	let i = e1;
	let j = e2;
	let k = 0;
	
	let newNumList = new Array(d2-e1+1);
	
	while( (i<=d1) && (j<=d2) )
	{
		let caixaI = document.getElementById(i);
		let caixaJ = document.getElementById(j);
		
		if(parseInt(caixaI.innerHTML) < parseInt(caixaJ.innerHTML))
		{
			newNumList[k] = caixaI.innerHTML;
			i++;			
		}
		else
		{
			newNumList[k] = caixaJ.innerHTML;
			j++;		
		}
		
		k++;
	}
	
	while(i<=d1)
	{
		newNumList[k] = document.getElementById(i).innerHTML;
		i++;
		k++;
	}	

	while(j<=d2)
	{
		newNumList[k] = document.getElementById(j).innerHTML;
		j++;
		k++;
	}
	
	for(let k = e1; k <= d2; k++)
		document.getElementById(k).innerHTML = newNumList[k-e1];	
}

function colorCaixas(a,b, color)
{
	for(let i = a; i <= b; i++)
		document.getElementById(i).style.backgroundColor = color;
	
}

async function mergesort(e,d)
{
	if(e < d)
	{
		let m = Math.floor((e+d)/2);
		
		await mergesort(e,m);		
		await mergesort(m+1,d);	
			
		colorCaixas(e,m,"blue");
		colorCaixas(m+1,d,"orange");
		await sleep(sleepTime);		
		
		merge(e,m,m+1,d);	
		
		colorCaixas(e,d,"green");	
		await sleep(sleepTime);	
		colorCaixas(e,d,"red");	
	}	
	
	if( (e==0) && (d==quantidadeCaixa-1) )
		fimVisualizador();
}

//Caixas Azuis: i e j sendo movimentados
//Numero laranja: Pivo

async function particao(esq, dir)
{
	let i = esq;
	let j = dir;	
	
	let pivoPos = Math.floor((esq+dir)/2);	
	let pivoLocal = document.getElementById(pivoPos);		
	
	let pivo = parseInt(pivoLocal.innerHTML);
	
	pivoLocal.style.color = "orange";
	
	while(i <= j)
	{			
		document.getElementById(i).style.backgroundColor = "blue";
		document.getElementById(j).style.backgroundColor = "blue";	
	
		await sleep(sleepTime);
        
		while(parseInt(document.getElementById(i).innerHTML) < pivo)
		{
			document.getElementById(i).style.backgroundColor = "blue";
			
			await sleep(sleepTime);
			
			document.getElementById(i).style.backgroundColor = "red";

			i++;
		}	
		
		document.getElementById(i).style.backgroundColor = "blue";
		
		while(parseInt(document.getElementById(j).innerHTML) > pivo)
		{
			document.getElementById(j).style.backgroundColor = "blue";
			
			await sleep(sleepTime);
			
			document.getElementById(j).style.backgroundColor = "red";
	 
			j--;
		}
		
		if(i < j)
		{
			document.getElementById(i).style.backgroundColor = "blue";
			document.getElementById(j).style.backgroundColor = "blue";
			
			await sleep(sleepTime);
			trocarCaixa(document.getElementById(i), document.getElementById(j));
			await sleep(sleepTime);
				
			document.getElementById(i).style.backgroundColor = "red";
			document.getElementById(j).style.backgroundColor = "red";
			
			i++;			
			j--;		
		}
		else
			break;
	}
	
	pivoLocal.style.color = "white";
	document.getElementById(j).style.backgroundColor = "red";
	document.getElementById(i).style.backgroundColor = "red";
	
	return j;	
}

async function quicksort(esq, dir)
{	
	if(esq < dir)
	{		
		let pivo = await particao(esq, dir);	
		await quicksort(esq, pivo);
		await quicksort(pivo+1, dir);		
	}
	
	if( (esq==0) && (dir==quantidadeCaixa-1) )
		fimVisualizador();
}

//Caixas Azuis: caixas selecionadas

async function shellsort()
{
	let pulo = Math.floor((quantidadeCaixa-1)/2);
	
	while (pulo > 0)
	{
		for(let i = pulo; i < quantidadeCaixa; i++)
		{
			let caixaAux = document.getElementById(i);
			
			caixaAux.style.backgroundColor = "blue";
			document.getElementById(i-pulo).style.backgroundColor = "blue";
					
			await sleep(sleepTime);
			
			caixaAux.style.backgroundColor = "red";
			document.getElementById(i-pulo).style.backgroundColor = "red";
			
			let aux = caixaAux.innerHTML;			
			let j;
			for(j = i; (j >= pulo) && ((document.getElementById(j-pulo).innerHTML) > aux); j-=pulo)
			{				
				console.log(j);
				
				let caixaJ = document.getElementById(j);
				let caixaJPulo = document.getElementById(j-pulo);
				
				caixaJ.style.backgroundColor = "blue";
				caixaJPulo.style.backgroundColor = "blue";
				await sleep(sleepTime);			
				
				caixaJ.innerHTML = caixaJPulo.innerHTML;
				
				await sleep(sleepTime);	
				caixaJ.style.backgroundColor = "red";
				caixaJPulo.style.backgroundColor = "red";
			}
			
			
			if(i!= j)
			{
				let caixaJ = document.getElementById(j);
				
				let caixaAuxValue = caixaAux.innerHTML;
				caixaAux.innerHTML += "<span style=\"font-size:4vh\">"+aux+"</span>";			
			
				caixaJ.style.backgroundColor = "blue";
				caixaAux.style.backgroundColor = "blue";	
				
				await sleep(sleepTime);	

				caixaAux.innerHTML = caixaAuxValue;			
				
				caixaJ.innerHTML = aux;	
				
				await sleep(sleepTime);	
				caixaJ.style.backgroundColor = "red";
				caixaAux.style.backgroundColor = "red";	
			
			}
		}
		
		pulo = Math.floor(pulo/2);		
	}
	
	fimVisualizador();
}

//Caixas Azuis: caixas selecionadas

function prnt(j)
{
	return Math.floor((j + 1) / 2) - 1;
}

async function build_max_heap(end)
{
	for (let i = 1; i <= end; i++)
	{
		let caixaI = document.getElementById(i);
		
		caixaI.style.backgroundColor = "blue";
		await sleep(sleepTime);
		caixaI.style.backgroundColor = "red";
		
		let aux = caixaI.innerHTML;
		let j = i;

		while (document.getElementById(j).innerHTML > document.getElementById(prnt(j)).innerHTML)
		{	
			let caixaJ = document.getElementById(j);
			let caixaParent = document.getElementById(prnt(j));
		
			caixaJ.style.backgroundColor = "blue";
			caixaParent.style.backgroundColor = "blue";
			await sleep(sleepTime);
	
			document.getElementById(j).innerHTML = document.getElementById(prnt(j)).innerHTML;
			document.getElementById(prnt(j)).innerHTML = aux;
			
			await sleep(sleepTime);
			
			caixaJ.style.backgroundColor = "red";
			caixaParent.style.backgroundColor = "red";
			
			j = prnt(j);

			if (j == 0)
				break;
		}
	}
}

async function heapsort()
{
	let caixaO = document.getElementById(0);
	
	for (let i = quantidadeCaixa-1; i >= 1; i--)
	{	
		await build_max_heap(i);
		
		let caixaI = document.getElementById(i);
		
		caixaI.style.backgroundColor = "blue";
		caixaO.style.backgroundColor = "blue";
		await sleep(sleepTime);
		
		trocarCaixa(caixaO,caixaI);
		
		await sleep(sleepTime);
		caixaI.style.backgroundColor = "red";
		caixaO.style.backgroundColor = "red";
	}

	fimVisualizador();
}

