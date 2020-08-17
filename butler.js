///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////UOF specific butler restocker - Created by aga/////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function butlerSetup() {
    Orion.CancelWaitGump();
    Orion.CancelWaitMenu();
    Orion.ClearJournal();
    Orion.RemoveObject('butler');
    Orion.Print('Target your butler');
    Orion.AddObject('butler');
    while (Orion.HaveTarget()) {
        Orion.Wait(100);
    }
    Orion.RemoveObject('keg');
    Orion.Print('Target your keg to use');
    Orion.AddObject('keg');
    while (Orion.HaveTarget()) {
        Orion.Wait(100);
    }
    Orion.Print('Target your resource container');
    Orion.AddObject('fromContainer');
    while (Orion.HaveTarget()) {
        Orion.Wait(100);
    }
    butlerStart('butler', 'keg', 'fromContainer');
}

function butlerStart(butler, keg, fromContainer) {
    Orion.AddType('regs', 0x0F8C);
    Orion.AddType('regs', 0x0F7B);
    Orion.AddType('regs', 0x0F7A);
    Orion.AddType('regs', 0x0F84);
    Orion.AddType('regs', 0x0F85);
    Orion.AddType('regs', 0x0F86);
    Orion.AddType('regs', 0x0F88);
    Orion.AddType('regs', 0x0F8D);
    if (Orion.FindObject('butler')) {
        Orion.CharPrint('butler', '2002', 'butler is set.');
    }
    if (Orion.FindObject('keg')) {
        Orion.CharPrint('keg', '2002', 'keg is set.');
    }
    if (Orion.FindObject('fromContainer')) {
        Orion.CharPrint('fromContainer', '2002', 'resource container is set.');
    }
    while (!Player.Dead()) {
        Orion.UseObject('butler');
        Orion.Wait(1000);
        butlergump = Orion.GetLastGump();
        var explopotcommand = butlergump.Command(80);
        arr = explopotcommand.split(' ');
        var numexplopots = butlergump.Text(arr[5]);
        var strpotcommand = butlergump.Command(83);
        arr = strpotcommand.split(' ');
        var numstrpots = butlergump.Text(arr[5]);
        var refreshpotcommand = butlergump.Command(86);
        arr = refreshpotcommand.split(' ');
        var numrefreshpots = butlergump.Text(arr[5]);
        var agilpotcommand = butlergump.Command(89);
        arr = agilpotcommand.split(' ');
        var numagilpots = butlergump.Text(arr[5]);
        var healpotcommand = butlergump.Command(92);
        arr = healpotcommand.split(' ');
        var numhealpots = butlergump.Text(arr[5]);
        var curepotcommand = butlergump.Command(95);
        arr = curepotcommand.split(' ');
        var numcurepots = butlergump.Text(arr[5]);
        Orion.Print('Butler Explosion potion count: ' + numexplopots)
        Orion.Print('Butler Strength potion count: ' + numstrpots)
        Orion.Print('Butler Refresh potion count: ' + numrefreshpots)
        Orion.Print('Butler Agility potion count: ' + numagilpots)
        Orion.Print('Butler Heal potion count: ' + numhealpots)
        Orion.Print('Butler Cure potion count: ' + numcurepots)

        var safeCounter = 0;
        var pot;
        var keg;

        var sulfurID = Orion.FindType('0x0F8C', '-1', Orion.FindObject('fromContainer').Serial());
        var sulfurCount = Orion.Count('0x0F8C', '-1', Orion.FindObject('fromContainer').Serial());
        var bmID = Orion.FindType('0x0F7B', '-1', Orion.FindObject('fromContainer').Serial());
        var bmCount = Orion.Count('0x0F7B', '-1', Orion.FindObject('fromContainer').Serial());
        var bpID = Orion.FindType('0x0F7A', '-1', Orion.FindObject('fromContainer').Serial());
        var bpCount = Orion.Count('0x0F7A', '-1', Orion.FindObject('fromContainer').Serial());
        var ga = Orion.FindType('0x0F84', '-1', Orion.FindObject('fromContainer').Serial());
        var gaCount = Orion.Count('0x0F84', '-1', Orion.FindObject('fromContainer').Serial());
        var gsID = Orion.FindType('0x0F85', '-1', Orion.FindObject('fromContainer').Serial());
        var gsCount = Orion.Count('0x0F85', '-1', Orion.FindObject('fromContainer').Serial());
        var mrID = Orion.FindType('0x0F86', '-1', Orion.FindObject('fromContainer').Serial());
        var mrCount = Orion.Count('0x0F86', '-1', Orion.FindObject('fromContainer').Serial());
        var nsID = Orion.FindType('0x0F88', '-1', Orion.FindObject('fromContainer').Serial());
        var nsCount = Orion.Count('0x0F88', '-1', Orion.FindObject('fromContainer').Serial());
        var ssID = Orion.FindType('0x0F8D', '-1', Orion.FindObject('fromContainer').Serial());
        var ssCount = Orion.Count('0x0F8D', '-1', Orion.FindObject('fromContainer').Serial());
        var botid = Orion.FindType('0x0F0E');
        var botcontid = Orion.FindType('0x0F0E', '-1', Orion.FindObject('fromContainer').Serial());
        var botcontcount = Orion.Count('0x0F0E', '-1', Orion.FindObject('fromContainer').Serial());
        var contID = Orion.GetSerial('fromContainer');

        Orion.Print(sulfurCount + ' Sulfurous Ash left in container');
        Orion.Print(bmCount + ' Bloodmoss left in container');
        Orion.Print(bpCount + ' Black Pearl left in container');
        Orion.Print(gaCount + ' Garlic left in container');
        Orion.Print(gsCount + ' Ginseng left in container');
        Orion.Print(mrCount + ' Mandrake Root left in container');
        Orion.Print(nsCount + ' Nightshade left in container');
        Orion.Print(ssCount + ' Spiders Silk left in container');
        Orion.Print(botcontcount + ' Empty bottles left in container');
        // EXPLO POTIONS
        if (numexplopots < 5000) {
            var potName = 'Greater Explosion';
            var potType = '0x0F0D';
            var regName = 'Sulfurous Ash';
            var regType = '0x0F8C';
            var FirstButton = 50;
            var SecondButton = 16;
            var CommandButton = 80;
            var NumberPots = numexplopots;
            potionsCraft('butler', 'keg', 'fromContainer', potName, potType, regName, regType, FirstButton, SecondButton, CommandButton, NumberPots);
        }
        // REFRESH POTIONS
        if (numrefreshpots < 5000) {
            var potName = 'Greater Refresh';
            var potType = '0x0F0B';
            var regName = 'Black Pearl';
            var regType = '0x0F7A';
            var FirstButton = 1;
            var SecondButton = 9;
            var CommandButton = 86;
            var NumberPots = numrefreshpots;
            potionsCraft('butler', 'keg', 'fromContainer', potName, potType, regName, regType, FirstButton, SecondButton, CommandButton, NumberPots);
        }
        // AGILITY POTIONS
        if (numagilpots < 5000) {
            var potName = 'Greater Agility';
            var potType = '0x0F08';
            var regName = 'Bloodmoss';
            var regType = '0x0F7B';
            var FirstButton = 8;
            var SecondButton = 9;
            var CommandButton = 89;
            var NumberPots = numagilpots;
            potionsCraft('butler', 'keg', 'fromContainer', potName, potType, regName, regType, FirstButton, SecondButton, CommandButton, NumberPots);
        }
        // HEAL POTIONS
        if (numhealpots < 5000) {
            var potName = 'Greater Heal';
            var potType = '0x0F0C';
            var regName = 'Ginseng';
            var regType = '0x0F85';
            var FirstButton = 22;
            var SecondButton = 16;
            var CommandButton = 92;
            var NumberPots = numhealpots;
            potionsCraft('butler', 'keg', 'fromContainer', potName, potType, regName, regType, FirstButton, SecondButton, CommandButton, NumberPots);
        }
        // CURE POTIONS
        if (numcurepots < 5000) {
            var potName = 'Greater Cure';
            var potType = '0x0F07';
            var regName = 'Garlic';
            var regType = '0x0F84';
            var FirstButton = 43;
            var SecondButton = 16;
            var CommandButton = 95;
            var NumberPots = numcurepots;
            potionsCraft('butler', 'keg', 'fromContainer', potName, potType, regName, regType, FirstButton, SecondButton, CommandButton, NumberPots);
        }
        // STRENGTH POTIONS
        if (numstrpots < 5000) {
            var potName = 'Greater Strength';
            var potType = '0x0F09';
            var regName = 'Mandrake Root';
            var regType = '0x0F86';
            var FirstButton = 29;
            var SecondButton = 9;
            var CommandButton = 83;
            var NumberPots = numstrpots;
            potionsCraft('butler', 'keg', 'fromContainer', potName, potType, regName, regType, FirstButton, SecondButton, CommandButton, NumberPots);
        }
    }
}

function potionsCraft(butler, keg, fromContainer, potName, potType, regName, regType, FirstButton, SecondButton, CommandButton, NumberPots) {
    keg = Orion.FindObject('keg');
    butlerCheck('butler', potName, potType, NumberPots, CommandButton);
    restockCheck(regType, 'fromContainer', regName);
    PotsLeft = 5000 - NumberPots;
    if (PotsLeft < 100) {
    potdelay = 2500;
    } else {
    potdelay = 500;
    }
    //Craft first potion
    Orion.Wait(800);
    if (Orion.FindType('0x0E9B', '0xFFFF', backpack)) {
        Orion.UseType('0x0E9B');
        Orion.Wait(800);
        Orion.WaitForGump(1000);
        for (j = Orion.GumpCount(); j >= 0; j--) {
            potiongump = Orion.GetGump(j);
            if (potiongump != null && potiongump.ID() == '0x38920ABD') {
                var selectFirstButton = Orion.CreateGumpHook(FirstButton);
                potiongump.Select(selectFirstButton)
                Orion.Print('Selecting ' + potName + ' potion for first time');
                Orion.WaitGump(selectFirstButton);
                Orion.Wait(500);
                var selectSecondButton = Orion.CreateGumpHook(SecondButton);
                potiongump.Select(selectSecondButton)
                Orion.WaitGump(selectSecondButton);
                Orion.Wait(500);
            }
        }
    } else {
        Orion.Print('ALERT: NO MORTARS FOUND');
        break;
    }
    //Craft potions loop
    while (parseInt(PotsLeft) >= 100) {
        kegprops = keg.Properties();
        //Put potions in keg
        if (Orion.Count(potType) >= 1 || Orion.Contains(kegprops, '100 Stones')) {
            Orion.Print('Potions found in pack. Attempting to empty keg on butler.');
            kegDrop('butler', 'keg', potName, potType, PotsLeft);
            butlerCheck('butler', potName, potType, NumberPots, CommandButton);
            PotsLeft = Orion.GetGlobal('NumPotsLeft');
            Orion.Print('Successfully emptied keg. ' + PotsLeft + ' potions left to make');
        }
        
        // Check if regs need to be replinished from container
        restockCheck(regType, 'fromContainer', regName);
        Orion.Wait(2000); //1800
        if (Orion.InJournal('You have worn out your tool!', 'system')) {
            Orion.ClearJournal('You have worn out your tool!', 'system');
            if (Orion.FindType('0x0E9B', '0xFFFF', backpack)) {
                Orion.Wait(potdelay);
                Orion.UseType('0x0E9B');
                Orion.Wait(potdelay);
            } else {
                Orion.Print('ALERT: NO MORTARS FOUND');
                break;
            }
        }
        Orion.Wait(potdelay);
        if (Orion.WaitForGump(3000)) {
               potiongump = Orion.GetLastGump();
                //potiongump = Orion.GetGump(j);
                if (potiongump != null && potiongump.ID() == '0x38920ABD') {
                    var makelast = Orion.CreateGumpHook(21);
                    potiongump.Select(makelast);
                    Orion.Wait(potdelay);
                    Orion.WaitGump(makelast);
                    potionCommands = potiongump.CommandList();
                    if (Orion.Contains(potionCommands, '1048136')) {
                        PotsLeft = PotsLeft - 1;
                        Orion.Print('Successfully created potion. ' + PotsLeft + ' potions left to make');
                    }
                } else {
                Orion.UseType('0x0E9B');
                Orion.Wait(potdelay);
                }
        }
    }
    Orion.Wait('1000');
    kegDrop('butler', 'keg', potName, potType, PotsLeft);
    Orion.Print('FINISHED CRAFTING ' + potName + ' POTIONS.');
    for (var i = 0; i < 10; i++) {
        Orion.UseObject(keg);
        Orion.Wait('600');
    }
    regID = Orion.FindType(regType, -1, backpack, 'fast');
    if (regID.length) {
        Orion.Wait('1500');
        Orion.MoveItem(regID, 'all', fromContainer);
        Orion.Wait('1500');
        Orion.Print('Extra ' + regName + ' put back into container');
    }
}

function butlerCheck(butler, potName, potType, NumberPots, CommandButton) {
    Orion.Wait(600);
    Orion.UseObject('butler');
    Orion.WaitForGump(3500);
    for (j = Orion.GumpCount(); j >= 0; j--) {
        butlergump = Orion.GetGump(j);
        if (butlergump != null && butlergump.ID() == '0x3AF7B574') {
            var potcommand = butlergump.Command(CommandButton);
            arr = potcommand.split(' ');
            var NumberPots = butlergump.Text(arr[5]);
            Orion.Print((4900 - NumberPots) + ' ' + potName + ' potions left to make.');
            var PotsLeft = 4900 - NumberPots;
            Orion.Print('Crafting ' + potName + ' potions.');
            Orion.Print((4900 - NumberPots) + ' ' + potName + ' potions left to make.');
            Orion.SetGlobal('NumPotsLeft', PotsLeft);    
        }
    }
}

function restockCheck(regType, fromContainer, regName) {
    // Check if current reg needs to be replinished from container
    if (Orion.Count(regType) <= 30) {
        Orion.Wait(600);
        Orion.Print('Trying to replenish ' + regName + ' from container');
        regs = Orion.FindType(regType, -1, fromContainer, 'fast');
        if (regs.length) {
            Orion.MoveItem(regs, '400', backpack);
            Orion.Print(' ' + regName + ' replenished from container');
            regCount = Orion.Count(regType, '-1', fromContainer);
            Orion.Print(regCount + ' ' + regName + ' left in container');
        } else {
            Orion.Print('ALERT: NO ' + regType + ' LEFT IN CONTAINER');
        }
    }
    // Check if Empty Bottles need to be replinished from container
    if (Orion.Count('0x0F0E') <= 10) {
        Orion.Wait('500');
        Orion.Print('Trying to replinish Empty Bottles from container');
        bottles = Orion.FindType('0x0F0E', '-1', fromContainer, 'fast');
        if (bottles.length) {
            Orion.MoveItem(bottles, '50', backpack);
            Orion.Print(' Empty Bottles replenished from container');
            botCount = Orion.Count('0x0F0E', '-1', fromContainer);
            Orion.Print(botCount + ' empty bottles left in container');
        } else {
            Orion.Print('ALERT: NO EMPTY BOTTLES LEFT IN CONTAINER');
        }
    }
}

function kegDrop(butler, keg, potName, potType, PotsLeft) {
    Orion.Wait('1500');
    Orion.Print('Moving keg onto butler');
    Orion.MoveItem('keg', 'all', 'butler')
    Orion.Wait('1500');
    pot = Orion.FindType(potType);
    potcount = Orion.Count(potType, '0xFFFF', backpack);
    PotsLeft = PotsLeft - potcount;
    for (var i = 0; i < pot.length; i++) {
        Orion.Print('Moving potions to keg');
        Orion.MoveItem(pot[i], 'all', 'keg');
        Orion.Wait('500');
    }
    Orion.SetGlobal('NumPotsLeft', PotsLeft);    
}
