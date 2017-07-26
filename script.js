function buttonWithArrowMouseOver(obj)
{
	var arrow = obj.children[0].children[0];
	arrow.className = "buttonArrowHovered";
	
	var buttonMenu = obj.children[1];
	buttonMenu.style.display = "block";
}

function buttonWithArrowMouseOut(obj)
{
	var arrow = obj.children[0].children[0];
	arrow.className = "buttonArrow";
	
	var buttonMenu = obj.children[1];
	buttonMenu.style.display = "none";
}

function redirectTo(url)
{
	window.location = url;
}