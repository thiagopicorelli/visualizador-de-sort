document.getElementById("Seleção").checked = true;
var quantidadeCaixa = 7;

function trocarCaixa(pos,dest)
{
	if(pos == dest)
		return;
	
	var caixaPos = document.getElementById(pos);
	var caixaDest = document.getElementById(dest);
	
	var caixaPos_num = caixaPos.innerHTML;
	caixaPos.innerHTML = caixaDest.innerHTML;
	caixaDest.innerHTML = caixaPos_num;
}

function iniciarVisualizador()
{
	var sortName = document.forms["sorts"]["sortName"].value;	
	
	if(sortName == "Seleção")
		selection();
	else if(sortName == "Inserção")
		insertion();
}

function selection()
{
	for(var i = 0; i < 7; i++)
	{	
		var menorNum = parseInt(document.getElementById(i).innerHTML, 10);
		var menorCaixa = i;

		for(var j = i; j < 7; j++)
		{
			caixaNum = parseInt(document.getElementById(j).innerHTML, 10);
			
			if(caixaNum < menorNum)
			{
				menorNum = caixaNum;
				menorCaixa = j;		
			}
		}
		
		trocarCaixa(menorCaixa, i);
	}

}

function insertion()
{
	trocarCaixa(0,3);
	setTimeout(function(){trocarCaixa(0,3);}, 1000);
}