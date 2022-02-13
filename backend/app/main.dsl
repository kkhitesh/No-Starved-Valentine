context 
{
    input phone: string;
    food: {[x:string]:string;}[]?=null;
    input res: string;
}
/**
* External call declarations.
external function send_order(food: {[x:string]:string;}): string;
*/


/**
* Script.
*/

start node root 
{
    do 
    {
        #connectSafe($phone);
        #waitForSpeech(1000);
        #sayText("Hi, this is Dasha, your AI server. Would you like to know an order for pick-up?"	);
        wait *;
    }    
    transitions 
    {
        place_order: goto place_order on #messageHasIntent("yes");
        can_help_then: goto can_help_then on #messageHasIntent("no");
    }
}

node place_order
{
    do 
    {
        #sayText("Great! Can i know order number?");
        wait *;
    }
    transitions 
    {
       payment: goto payment on true;
    }
}

node payment
{
    do
    {
        #sayText("Great! Please wait for a few minutes. I'll update you");
        wait *;
    }
     transitions 
    {
        by_card: goto by_card on #messageHasIntent("yes");
    }
}

node by_card
{
    //Your order is being prepared , have paitence for a while, it would reach in 30 minutes
    //Order is out for delivery, it would reach within 20 minutes.
    //Your order will be ready in 15 minutes. Anything else I can help you with? 
    do
    {
        #sayText($res);
        wait *;
    }
     transitions 
    {
        place_order: goto can_help on #messageHasIntent("yes");
        bye: goto success_bye on #messageHasIntent("no");
    }
}

digression delivery 
{
    conditions {on #messageHasIntent("delivery");}
    do 
    {
        #sayText("Unfortunately we only offer pick up service through this channel at the moment. Would you like to place an order for pick up now?");
        wait *;
    }
    transitions 
    {
        place_order: goto place_order on #messageHasIntent("yes");
        can_help_then: goto no_dice_bye  on #messageHasIntent("no");
    }
}

digression connect_me 
{
    conditions {on #messageHasIntent("connect_me");}
    do 
    {
        #sayText("Certainly. Please hold, I will now transfer you. Good bye!");
        #forward("2512801434");
        wait *;
    }
}

node can_help_then 
{
    do
    {
        #sayText("Bye");
        exit;
    }
}

node can_help
{
    do
    {
        #sayText("How can I help?");
        wait *;
    }
}

node success_bye 
{
    do 
    {
        #sayText("Thank you so much for your order. Have a great day. Bye!");
        #disconnect();
        exit;
    }
}

digression bye 
{
    conditions { on #messageHasIntent("bye"); }
    do 
    {
        #sayText("Thanks for your time. Have a great day. Bye!");
        #disconnect();
        exit;
    }
}

node no_dice_bye 
{
    do 
    {
        #sayText("Sorry I couldn't help you today. Have a great day. Bye!");
        #disconnect();
        exit;
    }
}