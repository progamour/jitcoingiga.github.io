var divs = document.getElementsByClassName("draggable-div");
for (var i = 0; i < divs.length; i++) 
{
    
    dragElement(divs[i]);
}

var zIndex = 11;
function dragElement(elm)
{
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var beforeTimestamp = 0;
	var moved = false;
    var header = elm.getElementsByClassName("draggable-div-header")[0], content = elm.getElementsByClassName("draggable-div-content")[0];
    header.onmousedown = dragMouseDown;
    header.onclick = openDiv;

    function dragMouseDown(e) 
    {
        if(elm.style.zIndex != zIndex)
        {
            elm.style.zIndex = (zIndex++);
        }
        beforeTimestamp = Date.now();
        e = e || window.event;
        e.preventDefault();
		
		if((pos3 - e.clientX) > 5 || (pos4 - e.clientY) > 5)
		{
			moved = true;
		}
		else
		{
			moved = false;
		}
		
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragDiv;
        document.onmousemove = divDrag;
        document.onclick = openDiv;
    }

    function divDrag(e) 
    {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
		
		if((elm.offsetTop - pos2) > 5 || (elm.offsetLeft - pos3) > 5)
		{
			moved = true;
		}
		else
		{
			moved = false;
		}
		
        elm.style.top = (elm.offsetTop - pos2) + "px";
        elm.style.left = (elm.offsetLeft - pos1) + "px";
    }

    function openDiv(e)
    {
        if((Date.now() - beforeTimestamp < 100) || moved == false)
        {
            if(content.style.display == 'block')
            {
                content.style.display = 'none';
                $(header).find('.fa-chevron-down,.fa-chevron-right').toggleClass('fa-chevron-down').toggleClass('fa-chevron-right');
            }
            else
            {
                content.style.display = 'block';
                $(header).find('.fa-chevron-down,.fa-chevron-right').toggleClass('fa-chevron-right').toggleClass('fa-chevron-down');
            }
        }
    }

    function closeDragDiv() 
    {
        document.onmouseup = null;
        document.onmousemove = null;
        document.onclick = null;
    }
}

var scythe_more_button = document.getElementById('scythe-hwid');
scythe_more_button.onclick = function()
{
    var form = document.getElementById("scythe-hwid-form");

    if(form.style.display == 'block')
    {
        form.style.display = 'none';
        scythe_more_button.innerHTML = 'add';
    }
    else
    {
        form.style.display = 'block';
        scythe_more_button.innerHTML = 'remove';
    }
}

function incrementColor(color, step)
{
    var toInt = parseInt(color.substr(1), 16);
    toInt += step;
    
    if(toInt > 16777216)
    {
        toInt -= 16777216;
    }
    if(toInt < 0)
    {
        toInt += 16777216;
    }

    return '#' + toInt.toString(16);
};

var colorPicker = new iro.ColorPicker('#picker', 
{
    width: 280,
    color: "#2CCB8A",
    borderWidth: 0,
    layout: [
    { 
        component: iro.ui.Slider,
        options: 
        {
            sliderType: 'hue'
        }
    },]
});

colorPicker.on('color:change', function(color) 
{
    var divs = document.getElementsByClassName("draggable-div-header");
    for (var i = 0; i < divs.length; i++) 
    {
        divs[i].style.backgroundColor = color.hexString;
    }

    $(document.getElementById("Trace_18")).attr('fill', color.hexString);

    var colorEdited = incrementColor(color.hexString, -10000);
    $(document.getElementById("Trace_19")).attr('fill', colorEdited);

    colorEdited = incrementColor(color.hexString, 10000);
    $(document.getElementById("Trace_21")).attr('fill', colorEdited);
    
});

var rainbow_checkbox = document.getElementById('rainbow-checkbox');
rainbow_checkbox.checked = false;

window.onload = function start() 
{
    rainbowTask(colorPicker);
}

function rainbowTask(colorPicker)
{
    window.setInterval(function() 
    {
        if(rainbow_checkbox.checked)
        {
            if(colorPicker.color.hue >= 360)
            {
                colorPicker.color.hue = 0;
            }
            else
            {
                colorPicker.color.hue += 1;
            }
        }
    }, 20);

    window.setInterval(function() 
    {
        document.getElementById('page-content').style.opacity = 1;
        return;
    }, 500);
}

function addScytheHwid(e)
{
    e.preventDefault();

    $.ajax({
        url: "scythe_hwid.php",
        data: { 
            "HWID": $('#scythe-hwid-text').innerHTML
        },
        cache: false,
        type: "POST"
    });

    $('#scythe-hwid-text').innerHTML = '';
}

function getXMLHttpRequest() 
{
    var xhr = null;
    if (window.XMLHttpRequest || window.ActiveXObject) 
    {
        if (window.ActiveXObject) 
        {
            try 
            {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } 
            catch(e) 
            {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } 
        else 
        {
            xhr = new XMLHttpRequest(); 
        }
    } 
    else 
    {
        alert("Error, incompatible web browser!");
        return null;
    }
    return xhr;
}

function addScytheHwid()
{
    var xhr = getXMLHttpRequest();
    xhr.onreadystatechange = function() 
    {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
        {
            alert(xhr.responseText);
        }
    };
    xhr.open("POST", "scythe_hwid.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("HWID=" + document.getElementById("scythe-hwid-text").value);

    document.getElementById("scythe-hwid-text").value = '';
}