jQuery(document).ready(function ()
{
    var orinoco;
    jQuery(".create-project").click(function (event)
    {
        event.preventDefault();
        orinoco = new Project(jQuery("#first-example"), jQuery(".templates>.project"), 'Project Orinoco js');
    });
    var newTodoList = new TodoList(jQuery("#second-example"), jQuery(".templates>.todo-list>.todo-element"), jQuery(".todo-container"));
    
    jQuery('a.scroll').click(function ()
    {
        console.log("hola");
        jQuery('html, body').animate(
                {
                    scrollTop: jQuery(jQuery.attr(this, 'href')).offset().top
                }, 500);

        return false;
    });
});
'use strict';
class Project extends Model
{
    constructor(wrapper, template, name)
    {
        super(wrapper, template);
        this.wrapper.append(this.template);
        var titleLabels = [this.template.find(".name"), this.template.find(".footer")];
        this.addAttribute("name", name, titleLabels);
        this.nameInput = this.template.find(".name-input");
        this.nameInput.focus();
        this.eventHandler();
    }

    updateProjectName(event)
    {
        this.setAttribute("name", this.nameInput.val());
    }
    eventHandler() {
        this.nameInput.on("input", this.updateProjectName.bind(this));
    }
}

class TodoList extends Model
{
    constructor(wrapper, template, bigWrapper)
    {
        super(wrapper, template);
        this.bigWrapper = bigWrapper;
        this.addTaskInput = this.bigWrapper.find(".add-task-input");
        this.addTaskButton = this.bigWrapper.find(".add-task");
        this.eventHandler();
    }
    addTask(input, event)
    {
        switch (input) {
            case "click":
                this.wrapper.append(this.template.clone().text(this.addTaskInput.val()));
                this.addTaskInput.val("");
                this.addTaskInput.focus();
                break;
            case "keypress":
                if (event.keyCode == 13)
                {
                    this.wrapper.append(this.template.clone().text(this.addTaskInput.val()));
                    this.addTaskInput.val("");
                }
                break;
            default:
                break;
        }
    }
    eventHandler()
    {
        this.addTaskButton.on("touchstart click", this.addTask.bind(this, "click"));
        this.addTaskInput.on("keypress", this.addTask.bind(this, "keypress"));
    }
}

(function ()
{
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--)
    {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method])
        {
            console[method] = noop;
        }
    }
}());


jQuery(window).resize(function ()
{

});

jQuery(window).scroll(function ()
{

});


