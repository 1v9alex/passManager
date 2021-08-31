### Announcement 📢
Recently I've decided to re-write the app from the ground up. The new version will be using a different tech stack with the aim of making the app multi-platform, working on Windows, Mac, and GNU/Linux. Ultimately, the new app will either be compatible with the old account data format or allow seamless migration. All existing features will be present and new or requested features will be addressed in the new version. The current version of the app will only be updated when/if there is any major change in the Riot Games API or client that would break the functionality of the app.

If you're interested about the current state of the project, any updates will be present in the README section [here.](https://github.com/MELVARDEV/League-Pass-Manager/tree/rewrite)

# League-Pass-Manager 🔑
A tool that makes it easier to manage your League of Legends and Valorant passwords, made for people who use infamous password storage method -> "accounts.txt" on the desktop.

![Screenshot](https://user-images.githubusercontent.com/36396619/125109347-86481100-e0e3-11eb-9102-4ea4c95be81c.png)

![accounts](https://user-images.githubusercontent.com/36396619/125109392-94962d00-e0e3-11eb-8fa9-8b7985f138f9.png)

![settings](https://user-images.githubusercontent.com/36396619/125109402-9829b400-e0e3-11eb-90c4-29e6c730545d.png)


## Features 📃
- Encrypts account data with a single password
- Auto-fills selected account or launches LoL and logs in automatically
- Shows Rank/Division and current level for stored accounts
- You can save data such as account region, username, password and a description for each account

### Disclaimer 📢
In some cases, the app won't launch unless started as an administrator.

## How to use ℹ️
1. Extract the app to a desired location
1. Create a shortcut to League Pass Manager.exe on your desktop if you wish to
1. Run the program and type in your encryption key / password that you will use each time you open the app. Remember the key or write it down somewhere safe as losing it will result in losing all saved account data.
1. Add an account by clicking on the first empty row and filling in the data
2. Your summoner data will be shown after you fill in `region` and `summoner name` fields

## Additional information ℹ
- Please create an issue if something is not working correctly. I am not actively monitoring if everyting works correctly, but I will address issues when possible.
  
## Todo ✔️
- [x] Option to change data file location
- [x] Option to change encryption key
- [x] Show summoner Icon
- [x] Show summoner Level, Rank/Tier
- [x] Add Valorant tab
- [ ] Option to set default launch tab LoL/Valorant
- [ ] Persistent sorting and column order
- [ ] More encryption methods
- [ ] Automatic password file backup
- [ ] Account export in formatted text
- [ ] Option to copy all data to clipboard
- [ ] Option to copy single account data to clipboard
- [❗] ~~Optional cloud sync~~ - bad idea (security & privacy concerns), workaround: store passwords.txt file in a cloud storage such as GDrive, DropBox, NextCloud, etc..


#### Disclaimer 📢📢
`` ⚠️You are encouraged to make backups of your account data as this is beta software and an event of data corruption might occur⚠️``

``This app isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends and Valorant. League of Legends™, Valorant and Riot Games are trademarks or registered trademarks of Riot Games, Inc.``
