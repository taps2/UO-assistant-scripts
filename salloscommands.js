//--#Sallos Commands
///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////Sallos commands - Created by aga//////////////////////////////////////////
///////Change command prefix (hotkeys tab) to '. ' for familiar Sallos functionality/////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function potdrop() {
    pottypes = '0x0F0C|0x0F0B|0x0F07|0x0F08|0x0F09|0x0F0D'
    Orion.Print('Target the destination container.');
    Orion.AddObject('container');
    while (Orion.HaveTarget()) {
        Orion.Wait(20);
    }
    pots = Orion.FindTypeEx(pottypes, '0x0000', backpack);
    if (pots.length) {
        for (var i = 0; i < pots.length; i++) {
            Orion.MoveItem(pots[i].Serial(), pots[i].Count(), 'container')
            Orion.Wait(600);
        }
    }
}

function casino() {
    roll = 'button 336 '
    resolve = 'button 336 368 '
    while (true) {
        monstershuffle = Orion.GetGump('last');
        if (monstershuffle !== null) {
            gumptext = monstershuffle.CommandList();
            for (var j = 0; j < gumptext.length; j++) {
                //if (gumptext[j].startsWith(roll)) {
                if (Orion.Contains(gumptext[j], resolve)) {
                    splittext = gumptext[j].split(/\s+/);
                    monstershuffle.Select(Orion.CreateGumpHook(splittext[8]));
                    break;
                }
            }
            for (var k = 0; k < gumptext.length; k++) {
                //if (gumptext[j].startsWith(roll)) {
                if (Orion.Contains(gumptext[k], roll)) {
                    splittext = gumptext[k].split(/\s+/);
                    monstershuffle.Select(Orion.CreateGumpHook(splittext[8]));
                    break;
                }
            }
        }
        Orion.Wait(500);
    }
}
// splittext = commandl[j].split(/\s+/);
//   if (gumpObj.Text(splittext[5]) == vivifytext) {
//    vivify = 1;
//   }

function regdrop() {
    regtypes = '0x0F8D|0x0F85|0x0F84|0x0F86|0x0F88|0x0F7B|0x0F8C|0x0F7A'
    Orion.Print('Target the destination container.');
    Orion.AddObject('container');
    while (Orion.HaveTarget()) {
        Orion.Wait(20);
    }
    regs = Orion.FindTypeEx(regtypes, '0x0000', backpack);
    if (regs.length) {
        for (var i = 0; i < regs.length; i++) {
            Orion.MoveItem(regs[i].Serial(), regs[i].Count(), 'container')
            Orion.Wait(600);
        }
    }
}

function move() {
    Orion.Print('Target one of the items to move.');
    Orion.WaitForAddType('itemtype');
    Orion.Print('Target the destination container.');
    Orion.AddObject('container');
    while (Orion.HaveTarget()) {
        Orion.Wait(20);
    }
    itemstomove = Orion.FindTypeEx('itemtype', '-1', backpack);
    if (itemstomove.length) {
        for (var i = 0; i < itemstomove.length; i++) {
            Orion.MoveItem(itemstomove[i].Serial(), itemstomove[i].Count(), 'container')
            Orion.Wait(600);
        }
    }
}

function leapfrog() {
    if (Orion.ScriptRunning('leapfrogset')) {
        Orion.Print('Leapfrog item cleared.');
        Orion.Terminate('leapfrogset');
        Orion.BlockMoving(false);
    } else {
        Orion.Print('Target the item to leapfrog.');
        Orion.AddObject('leapfrogitem');
        while (Orion.HaveTarget()) {
            Orion.Wait(20);
        }
        Orion.Exec('leapfrogset', 'leapfrogitem');
    }
}

function leapfrogset(leapfrogitem) {
    var value = 2;
    var empty = 0;

    var offset = [
        [empty, -value], //direction = 0
        [value, -value], //direction = 1
        [value, empty], //direction = 2
        [value, value], //direction = 3
        [empty, value], //direction = 4
        [-value, value], //direction = 5
        [-value, empty], //direction = 6
        [-value, -value] //direction = 7
    ];
    item = Orion.FindObject('leapfrogitem');
    while (true) {
        Orion.Wait(1);
        var xy = offset[Player.Direction() & 7];
        if (item.X() !== (Player.X() + xy[0]) && item.Y() !== (Player.Y() + xy[1]) && item.Distance() == 2) {
            Orion.BlockMoving(false);
            Orion.DragItem('leapfrogitem');
            Orion.DropDraggedItemRelative(xy[0], xy[1]);
        } else if (item.X() == (Player.X() + xy[0]) && item.Y() == (Player.Y() + xy[1]) && item.Distance == 2) {
            Orion.Print('behind?');
        }
    }
}

function give(args) {
    if (args == 'recalls') {
        items = ['0x0F86', '0x0F7B', '0x0F7A'];
        count = 2;
        for (var i = 0; i < items.length; i++) {
            if (Orion.Count(items[i], '-1', backpack) <= 2) {
                Orion.Print('You do not have enough to give them.');
                Orion.Terminate('give');
            }
        }
    } else if (args == 'gates') {
        items = ['0x0F86', '0x0F8C', '0x0F7A'];
        count = 2;
        for (var i = 0; i < items.length; i++) {
            if (Orion.Count(items[i], '-1', backpack) <= 2) {
                Orion.Print('You do not have enough to give them.');
                Orion.Terminate('give');
            }
        }
    } else if (args == 'regs') {
        items = ['0x0F86', '0x0F8C', '0x0F7A', '0x0F7B', '0x0F8D', '0x0F84', '0x0F85', '0x0F88'];
        count = 10;
        for (var i = 0; i < items.length; i++) {
            if (Orion.Count(items[i], '-1', backpack) <= 20) {
                Orion.Print('You do not have enough to give them.');
                Orion.Terminate('give');
            }
        }
    } else {
        Orion.Print('Unknown item name');
        Orion.Terminate('give');
    }
    Orion.Print('Who do you wish to give these items to?');
    Orion.AddObject('persontotrade');
    while (Orion.HaveTarget()) {
        Orion.Wait(20);
    }
    if (items.length) {
        for (var i = 0; i < items.length; i++) {
            itemobject = Orion.FindType(items[i], '-1', backpack, 'fast');
            Orion.MoveItem(itemobject, count, 'persontotrade');
            Orion.Wait(600);
        }
    }
    Orion.TradeCheck('0', true);
}

function disturb() {
    if (!Orion.HaveTarget()) {
        layer = ['18', '14', '3', '23', '10', '7', '22', '6', '19']
        for (var i = 0; i < layer.length; i++) {
            var disruptor = Orion.ObjAtLayer(layer[i]);
            if (disruptor != null) {
                break;
            }
        }
        if (disruptor == null) {
            Orion.Print('Cant find clothing to disrupt.')
            Orion.Terminate('disturb');
        } else {
            Orion.DragItem(disruptor.Serial(), '-1');
            Orion.EquipDraggedItem();
        }
    } else {
        Orion.CancelTarget();
    }
}

function lightningwand() {
    var wands = Orion.FindTypeEx('0x0DF3|0x0DF5', '0xFFFF', backpack);
    if (wands.length) {
        for (var i = 0; i < wands.length; i++) {
            if (Orion.Contains(wands[i].Properties(), 'Lightning')) {
                Orion.Equip(wands[i]);
                Orion.UseObject(wands[i]);
                return;
            }
        }
    }
}

function TargetClosest() {
    var mobileID = Orion.FindType("0x0190|0x0191|0x025D|0x025E|0x029B|0x029A|0x0190|0x04E6|0x0084|0x000F6|0x00DC|0x007A|0x0019|0x00DB|0x02EC|0x02EB", "-1", ground, "near|live|ignoreself|ignorefriends", 18, "gray|criminal|orange|red");

    if (mobileID.length) {
        Orion.ClientLastAttack(mobileID[0]);
        Orion.ClientLastTarget(mobileID[0]);
        var enemy = Orion.FindObject(mobileID[0]);
        var notoColor;
        Orion.Print(enemy.Notoriety());
        switch (enemy.Notoriety()) {
            case 1:
                notoColor = 2119;
                break;
            case 3:
                notoColor = 906;
                break;
            case 6:
                notoColor = 33;
                break;
            default:
                notoColor = 48;
        }
        Orion.CharPrint(mobileID[0], notoColor, '- last target set -');
        Orion.CharPrint(self, notoColor, "[Enemy:] " + enemy.Name());
        return;
    }
}

function remove() {
    Orion.AddObject('removeitem');
    Orion.Print('-1', 'Select an item to remove');
    while (Orion.HaveTarget()) {
        Orion.Wait('20');
    }
    Orion.Hide('removeitem');
}

function dragtobag() {
    Orion.Print('-1', 'Target an item to move.');
    Orion.AddObject('item');
    while (Orion.HaveTarget()) {
        Orion.Wait('20');
    }
    Orion.MoveItem('item', backpack);
}

function usegate() {
    Orion.CancelWaitGump();
    Orion.WaitGump(Orion.CreateGumpHook(1));
    if (!Orion.UseFromGround("0x0F6C|0x4BCB", '-1', 1)) {
        Orion.CharPrint(self, 1153, 'Gate not found');
        Orion.CancelWaitGump();
    }
}

function alwaysrun() {
    Orion.OptionAlwaysRun(!Orion.ClientOptionGet('AlwaysRun'));
}

function friend() {
    Orion.Print('Target a player to toggle their friendship status.');
    Orion.AddObject('friend');
    while (Orion.HaveTarget()) {
        Orion.Wait('20');
    }
    if (friend !== null) {
        friendobj = Orion.FindObject('friend');
        friendlist = Orion.GetFriendList();
        for (var i = 0; i < friendlist.length; i++) {
            if (friendlist[i] == friendobj.Serial()) {
                Orion.CharPrint('friend', '33', ' - unfriended -');
                Orion.RemoveFriend('friend');
                Orion.Print('They have been removed from the friends list.');
                Orion.Terminate('friend');
            }
        }
        Orion.AddFriend(friendobj.Name(), friendobj.Serial());
        Orion.CharPrint('friend', '33', ' - friended -');
        Orion.Print('They have been added to the friends list.');
    }
}
   
function openrunebooks() {
    runebooktexttosearch = '115 17 '
    finalJSON = [];
    backpackrunebooks = Orion.FindType('0x22C5', '-1', backpack);
    groundrunebooks = Orion.FindType('0x22C5', '-1', ground, '2');
    runebooks = backpackrunebooks.concat(groundrunebooks);
    for (var i = 0; i < runebooks.length; i++) {
        Orion.UseObject(runebooks[i]);
        Orion.Wait(700);
        if (Orion.WaitForGump(1000)) {
                runebookgump = Orion.GetGump('last');
                if (runebookgump != null && runebookgump.ID() == '0x554B87F3') {
                    runebooktext = runebookgump.CommandList();
                    button = 5;
                    for (var k = 34; k < 66; k += 2) {
                        gumpcommand = runebookgump.Command(k);
                        splittext = gumpcommand.split(/\s+/);
                        var obj = {
                            RSerial: runebooks[i],
                            RName: runebookgump.Text(splittext[7]).toLowerCase(),
                            RPosition: button
                        };
                        var myJSON = JSON.stringify(obj);
                        finalJSON = myJSON + '\n' + finalJSON
                        button = button + 6;
                    }
            }
        }
    }
    Orion.Print('Finished loading runebooks.');
    lastgump = Orion.GetLastGump()
    lastgump.Select(Orion.CreateGumpHook(0));
    var output = Orion.NewFile();
    output.Remove('./OA/Config/' + Player.Serial() + '.txt');
    output.Open('./OA/Config/' + Player.Serial() + '.txt');
    output.Write(finalJSON);
    output.Close();
}

function recall(args) {
    args = args.toLowerCase();
    var input = Orion.NewFile();
    input.Open('./OA/Config/' + Player.Serial() + '.txt');
    var line = 1;
    while (line) {
        line = input.ReadLine();
         TextWindow.Open();
         TextWindow.Print(line);
        if (!line) {
            break;
        } else {
            parsedline = JSON.parse(line);
            TextWindow.Print(parsedline.RSerial + parsedline.RName + parsedline.RPosition);
            if (parsedline.RName == args) {
                runebookobj = Orion.FindObject(parsedline.RSerial);
                Orion.Print(parsedline.RSerial);
                if (runebookobj) {
                    if (runebookobj.Distance() < 2) {
                        Orion.UseObject(runebookobj.Serial());
                        if (Orion.WaitForGump(1000)) {
                            for (i = Orion.GumpCount(); i >= 0; i--) {
                                runebookgump = Orion.GetGump(i);
                                if (runebookgump != null && runebookgump.ID() == '0x554B87F3') {
                                    runebookgump.Select(Orion.CreateGumpHook(parsedline.RPosition));
                                    Orion.CharPrint(self, '55', '- ' + parsedline.RName + ' -');
                                    return;
                                }
                            }
                        }
                    } else {
                        Orion.CharPrint(runebookobj.Serial(), '22', 'Runebook is too far away!');
                        return;
                    }
                }
            }
        }
    }
    Orion.Print('Rune name is not found (or currently unable to support spaces in rune names).');
}

function gate(args) {
    args = args.toLowerCase();
    var input = Orion.NewFile();
    input.Open('./OA/Config/' + Player.Serial() + '.txt');
    var line = 1;
    while (line) {
        line = input.ReadLine();
        if (!line) {
            break;
        } else {
            parsedline = JSON.parse(line);
            if (parsedline.RName == args) {
                runebookobj = Orion.FindObject(parsedline.RSerial);
                if (runebookobj) {
                    if (runebookobj.Distance() < 2) {
                        Orion.UseObject(runebookobj.Serial());
                        if (Orion.WaitForGump(1000)) {
                            for (i = Orion.GumpCount(); i >= 0; i--) {
                                runebookgump = Orion.GetGump(i);
                                if (runebookgump != null && runebookgump.ID() == '0x554B87F3') {
                                    runebookgump.Select(Orion.CreateGumpHook(parsedline.RPosition + 1));
                                    Orion.CharPrint(self, '55', '- ' + parsedline.RName + ' -');
                                    return;
                                }
                            }
                        }
                    } else {
                        Orion.CharPrint(runebookobj.Serial(), '22', 'Runebook is too far away!');
                        return;
                    }
                }
            }
        }
    }
    Orion.Print('Rune name is not found (or currently unable to support spaces in rune names).');
}
