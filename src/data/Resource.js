/**
 * Created by GSN on 6/2/2015.
 */


var res = {
    //font
    FONT_BITMAP_NUMBER_1:"fonts/number_1.fnt",
    FONT_BITMAP_DICE_NUMBER: "fonts/diceNumber.fnt",
    //zcsd
    //screen
    ZCSD_SCREEN_MENU:"zcsd/screen_menu.json",
    ZCSD_SCREEN_NETWORK:"zcsd/screen_network.json",
    ZCSD_SCREEN_LOCALIZATION:"zcsd/screen_localize.json",
    ZCSD_SCREEN_DRAGON_BONES:"zcsd/screen_dragon_bones.json",
    ZCSD_SCREEN_DECRYPTION:"zcsd/screen_decryption.json",
    ZCSD_SCREEN_ZALO:"zcsd/screen_zalo.json",
    //popup
    ZCSD_POPUP_MINI_GAME:"zcsd/game/mini_game/PopupMiniGame.json",

    //images
    Slot1_png : "zcsd/slot1.png"
};

var g_resources = [
    "CloseNormal.png",
    "CloseSelected.png",
    "game/animation/character/chipu/skeleton.xml",
    "game/animation/eff_dice_number/skeleton.xml",
    "game/animation/effDiceNumber/skeleton.xml",
    "game/animation/firework_test/skeleton.xml",
    "game/animation/ruongngusac/skeleton.xml",
    "game/animation/Dragon/skeleton.json",
    "game/animation/DragonBoy/skeleton.json",
    "game/animation/lobby_girl/skeleton.xml",
    "config.json",
    "Default/Button_Disable.png",
    "Default/Button_Normal.png",
    "Default/Button_Press.png",

    "favicon.ico",
    "HelloWorld.png",
    "fonts/diceNumber.fnt",
    "fonts/diceNumber.png",
    "fonts/eff_number.fnt",
    "fonts/eff_number.png",
    "fonts/number_1.fnt",
    "fonts/number_1.png",
    "game/animation/character/chipu/texture.plist",
    "game/animation/character/chipu/texture.png",
    "game/animation/eff_dice_number/texture.plist",
    "game/animation/eff_dice_number/texture.png",
    "game/animation/effDiceNumber/texture.plist",
    "game/animation/effDiceNumber/texture.png",
    "game/animation/firework_test/texture.plist",
    "game/animation/firework_test/texture.png",
    "game/animation/ruongngusac/texture.xml",
    "game/animation/ruongngusac/texture.png",
    "game/animation/Dragon/texture.json",
    "game/animation/Dragon/texture.png",
    "game/animation/DragonBoy/texture.json",
    "game/animation/DragonBoy/texture.png",
    "game/animation/lobby_girl/texture.plist",
    "game/animation/lobby_girl/texture.png",
    "ipConfig.json",
    "localize/config.json",
    "localize/vi.txt",
    "localize/en.txt",
    "shaders/change_color.fsh",
    "zcsd/screen_decryption.json",
    "zcsd/screen_dragon_bones.json",
    "zcsd/screen_localize.json",
    "zcsd/screen_menu.json",
    "zcsd/screen_network.json",
    "zcsd/screen_zalo.json",
];
var explosion_res = {
	explosion_plist : "res/game/animation/barrier_explode/explosion.plist",
	e_png : "res/game/animation/barrier_explode/e.png",
	explosion_anim : "res/game/animation/barrier_explode/explosion_anim.plist",
};
var mole_res = {
	mole_plist : "res/game/animation/mole_run/mole.plist",
	mole_png : "res/game/animation/mole_run/mole.png",
	mole_anim : "res/game/animation/mole_run/mole_anim.plist",
};
var sound_res = {   // not use
	bone_ogg : "assests/game/golddigger/media/bone.ogg",
	bonus_ogg : "assests/game/golddigger/media/bonus.ogg",
	button_ogg : "assests/game/golddigger/media/button.ogg",
	cable_ogg : "assests/game/golddigger/media/cable.ogg",
	explosion_ogg : "assests/game/golddigger/media/explosion.ogg",
	gamemusic_ogg : "assests/game/golddigger/media/gamemusic.ogg",
	gameover_ogg : "assests/game/golddigger/media/gameover.ogg",
	gamewon_ogg : "assests/game/golddigger/media/gamewon.ogg",
	gold_ogg : "assests/game/golddigger/media/gold.ogg",
	jewel_ogg : "assests/game/golddigger/media/jewel.ogg",
	bone_ogg : "assests/game/golddigger/media/bone.ogg",
	miss_ogg : "assests/game/golddigger/media/miss.ogg",
	mole_ogg : "assests/game/golddigger/media/mole.ogg",
	rock_ogg : "assests/game/golddigger/media/rock.ogg",
	score_ogg : "assests/game/golddigger/media/score.ogg",
	taptoplay_ogg : "assests/game/golddigger/media/taptoplay.ogg",
	timeover_ogg : "assests/game/golddigger/media/timeover.ogg",
	treasure_ogg : "assests/game/golddigger/media/treasure.ogg",

	bone_m4a : "assests/game/golddigger/media/bone.m4a",
	bonus_m4a : "assests/game/golddigger/media/bonus.m4a",
	button_m4a : "assests/game/golddigger/media/button.m4a",
	cable_m4a : "assests/game/golddigger/media/cable.m4a",
	explosion_m4a : "assests/game/golddigger/media/explosion.m4a",
	gamemusic_m4a : "assests/game/golddigger/media/gamemusic.m4a",
	gameover_m4a : "assests/game/golddigger/media/gameover.m4a",
	gamewon_m4a : "assests/game/golddigger/media/gamewon.m4a",
	gold_m4a : "assests/game/golddigger/media/gold.m4a",
	jewel_m4a : "assests/game/golddigger/media/jewel.m4a",
	bone_m4a : "assests/game/golddigger/media/bone.m4a",
	miss_m4a : "assests/game/golddigger/media/miss.m4a",
	mole_m4a : "assests/game/golddigger/media/mole.m4a",
	rock_m4a : "assests/game/golddigger/media/rock.m4a",
	score_m4a : "assests/game/golddigger/media/score.m4a",
	taptoplay_m4a : "assests/game/golddigger/media/taptoplay.m4a",
	timeover_m4a : "assests/game/golddigger/media/timeover.m4a",
	treasure_m4a : "assests/game/golddigger/media/treasure.m4a",
    
	bone_mp3 : "assests/game/golddigger/media/bone.mp3",
	bonus_mp3 : "assests/game/golddigger/media/bonus.mp3",
	button_mp3 : "assests/game/golddigger/media/button.mp3",
	cable_mp3 : "assests/game/golddigger/media/cable.mp3",
	explosion_mp3 : "assests/game/golddigger/media/explosion.mp3",
	gamemusic_mp3 : "assests/game/golddigger/media/gamemusic.mp3",
	gameover_mp3 : "assests/game/golddigger/media/gameover.mp3",
	gamewon_mp3 : "assests/game/golddigger/media/gamewon.mp3",
	gold_mp3 : "assests/game/golddigger/media/gold.mp3",
	jewel_mp3 : "assests/game/golddigger/media/jewel.mp3",
	bone_mp3 : "assests/game/golddigger/media/bone.mp3",
	miss_mp3 : "assests/game/golddigger/media/miss.mp3",
	mole_mp3 : "assests/game/golddigger/media/mole.mp3",
	rock_mp3 : "assests/game/golddigger/media/rock.mp3",
	score_mp3 : "assests/game/golddigger/media/score.mp3",
	taptoplay_mp3 : "assests/game/golddigger/media/taptoplay.mp3",
	timeover_mp3 : "assests/game/golddigger/media/timeover.mp3",
	treasure_mp3 : "assests/game/golddigger/media/treasure.mp3",
};


var battle_res = {
	map_background_0000 : "assests/game/map/map_background_0000.png",
	map_background_0003 : "assests/game/map/map_background_0003.png",
	map_cell_0002 : "assests/game/map/map_cell_0002.png",
    
	map_decoration_0001 : "assests/game/map/map_decoration_0001.png",
	map_decoration_0002 : "assests/game/map/map_decoration_0002.png",
	map_decoration_tree_0001 : "assests/game/map/map_decoration_tree_0001.png",
	map_decoration_tree_0002 : "assests/game/map/map_decoration_tree_0002.png",
	map_decoration_tree_0003 : "assests/game/map/map_decoration_tree_0003.png",
	map_decoration_tree_0004 : "assests/game/map/map_decoration_tree_0004.png",
    
	map_house : "assests/game/map/map_house.png",
	map_monster_gate_player : "assests/game/map/map_monster_gate_player.png",
	map_river_0000 : "assests/game/map/map_river_0000.png",

    map_forest_obstacle_3: "assests/game/map/map_forest_obstacle_3.png",
    map_forest_obstacle_2: "assests/game/map/map_forest_obstacle_2.png",
    map_forest_obstacle_1: "assests/game/map/map_forest_obstacle_1.png",
    
    map_decoration_grass_0000: "assests/game/map/map_decoration_grass_0000.png",

    monster_assassin_run_0000: "assests/game/monster/frame/assassin/monster_assassin_run_0000.png",
    monster_dark_giant_run_0000: "assests/game/monster/frame/dark_giant/monster_dark_giant_run_0000.png",
    monster_iceman_run_0000: "assests/game/monster/frame/iceman/monster_iceman_run_0000.png",
    monster_bat_run_0000: "assests/game/monster/frame/bat/monster_bat_run_0000.png",
};


var monster_assassin_res = {
	assassin_plist : "assests/animation/assassin/assassin.plist",
	assassin_png : "assests/animation/assassin/assassin.png",
	assassin_anim_plist : "assests/animation/assassin/assassin_anim.plist",
};