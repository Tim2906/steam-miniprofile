const fs = require('fs');
const cheerio = require('cheerio');
const got = require('got');

module.exports = {
    activity: function(userID){
        this.userID = userID;
        const vgmUrl = `https://steamcommunity.com/miniprofile/${userID}`;
        got(vgmUrl).then(response => {
            const $ = cheerio.load(response.body);
            if($('.friend_status_offline').text() == "Offline"){
                return $('.friend_status_offline').text();
            }
            if($('.friend_status_online').text() == "Online"){
                return $('.friend_status_online').text();
            }
            if($('.game_state').text == "In-Game"){
                return($('.miniprofile_game_name').text());
            }
            if($('.rich_presence').text()){
                return($('.rich_presence').text());
            }
        }).catch(err => {
            return(err);
        });
    },
    miniprofile_background: function(userID){
        this.userID = userID;
        const vgmUrl = `https://steamcommunity.com/miniprofile/${userID}`;
        got(vgmUrl).then(response => {
            const $ = cheerio.load(response.body);
            if($('.miniprofile_nameplate')){
                return $('.miniprofile_nameplate').find('source').attr('src');
            }
        }).catch(err => {
            return(err);
        });
    },
    miniprofile_avatar_frame: function(userID){
        this.userID = userID;
        const vgmUrl = `https://steamcommunity.com/miniprofile/${userID}`;
        got(vgmUrl).then(response => {
            const $ = cheerio.load(response.body);
            if($('.playersection_avatar_frame')){
                return $('.playersection_avatar_frame').find('img').attr('src');
            }
        }).catch(err => {
            return(err);
        })
    },
    playersection_avatar: function(userID){
        this.userID = userID;
        const vgmUrl = `https://steamcommunity.com/miniprofile/${userID}`;
        got(vgmUrl).then(response => {
            const $ = cheerio.load(response.body);
            if($('.playersection_avatar_frame')){
                return $('.playersection_avatar_frame').find('img').attr('src');
            }
        }).catch(err => {
            return(err);
        });
    },
    player_name: function(userID){
        this.userID = userID;
        const vgmUrl = `https://steamcommunity.com/miniprofile/${userID}`;
        got(vgmUrl).then(response => {
            const $ = cheerio.load(response.body);
            if($('.player_content')){
                var onoff = $('.player_content').find('span').text();
                if(onoff.includes('Offline')){
                    return onoff.slice(0, -7);
                }
                if(onoff.includes('Online')){
                    return onoff.slice(0, -6);
                }
            }
        }).catch(err => {
            return(err);
        });
    },
    player_feature_name: function(userID){
        this.userID = userID;
        const vgmUrl = `https://steamcommunity.com/miniprofile/${userID}`;
        got(vgmUrl).then(response => {
            const $ = cheerio.load(response.body);
            if($('.miniprofile_featuredcontainer')){
                var cut = $('.name').text().slice(0, -11);
                return cut;
            }
        }).catch(err => {
            return(err);
        });
    },
    player_xp: function(userID){
        this.userID = userID;
        const vgmUrl = `https://steamcommunity.com/miniprofile/${userID}`;
        got(vgmUrl).then(response => {
            const $ = cheerio.load(response.body);
            if($('.miniprofile_featuredcontainer')){
                return $('.xp').text();
            }
        }).catch(err => {
            return(err);
        });
    },
    player_level: function(userID){
        this.userID = userID;
        const vgmUrl = `https://steamcommunity.com/miniprofile/${userID}`;
        got(vgmUrl).then(response => {
            const $ = cheerio.load(response.body);
            if($('.miniprofile_featuredcontainer')){
                return $('.friendPlayerLevelNum').text();
            }
        }).catch(err => {
            return(err);
        });
    },
}
