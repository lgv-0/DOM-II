// Your code goes here
let registeredEvents = [];
function registerEventToList(a_List, s_EventName, f_Action)
{
    registeredEvents.push(f_Action.name);
    a_List.forEach((e_Cur) =>
    {
        e_Cur.addEventListener(s_EventName, f_Action,
            {
                    once: false
            });
    });
}
function f_Find(s_Inc)
{
    return document.querySelectorAll(s_Inc);
}
function InjectCSSDirect(e_Target, s_CSSstring)
{
    let Build = Object();

    s_CSSstring.split(",").forEach((s_Cur) =>
        {
            let temp = s_Cur.split(":");
            Build[temp[0]] = temp[1];
        });

    if (Array.isArray(e_Target))
    {
        e_TargetList.forEach((e_Cur) =>
            {
                Object.assign(e_Cur.style, Build);
            });
    }
    else
        if (InjectCSSDirect.caller != null)
            Object.assign(registeredEvents.indexOf(InjectCSSDirect.caller.name) != -1 ? e_Target.target.style : e_Target.style, Build);
        else
            Object.assign(e_Target.style, Build);
}

registerEventToList(f_Find("p"), "mouseover", function _mouseOver (eventSender) {InjectCSSDirect(eventSender, "fontSize:x-large")});
registerEventToList(f_Find("p"), "mouseleave", function _mouseLeave (eventSender) {InjectCSSDirect(eventSender, "fontSize:medium")});

registerEventToList(f_Find("html"), "keydown", function _keyDown (eventSender) {InjectCSSDirect(eventSender, "opacity:0")});
registerEventToList(f_Find("html"), "keyup", function _keyUp (eventSender) {InjectCSSDirect(eventSender, "opacity:100")});

registerEventToList(f_Find("nav a"), "wheel", function _onWheel (eventSender)
    {
        eventSender.preventDefault();

        let size = eventSender.target.style.fontSize;
        if (size.length == 0)
            InjectCSSDirect(eventSender, "fontSize:16px");
        else
            InjectCSSDirect(eventSender, `fontSize:${eventSender.deltaY < 0 ? parseFloat(size.replace("px", "")) + 0.5 : parseFloat(size.replace("px", "")) - 0.5}px`);
    });

f_Find("h2")[0].setAttribute("draggable", "true");
f_Find("h2")[0].setAttribute("ondragstart", "event.target.innerText = event.target.innerText.substring(0, event.target.innerText.length - 1);");

window.onload = (eventSender) =>
    {
        f_Find(".footer p")[0].style.backgroundColor = "orange";
    };;

window.onresize = (eventSender) =>
    {
        alert("Our webpage is recommended to stay within a 300-800px range!");
    };;

registerEventToList(f_Find(".logo-heading"), "dblclick", function _dblClick (eventSender) {location.reload();});

registerEventToList(f_Find(".destination h4"), "click", function _select (eventSender)
    {
        InjectCSSDirect(eventSender, "color:red,backgroundColor:black");
    });