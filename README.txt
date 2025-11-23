==Expense-Entry==
==App to track expenses using telegram==
==Still in Developement==

Preperation:
 - Spreadsheet
 - Google App Script
 - Telegram Bot
 - dotenv

A. Spreadsheet
    Spreadsheet to save data. Save it in ur gdrive.:
    1. Sheet Name:
        Current name is default "Sheet1"    
      
    2. Header:
        Current Header
        Ref | Date | Time | Category | Description | Amount | Methode | Notes
        
    3. Spreadsheet ID:
        The Spreadsheet ID is in the link. Example:
            docs.google.com/spreadsheets/d/==SHEET_ID==/edit

B. Script
    1. Set the script from the Spreadsheet. On Extensions, pick Apps Script
    2. Copy Script content to the Code.gs
    3. Press Deployment, New Deployment (If new)
    4. Type is webapp, fill desc, execute as Me, access is for Anyone. Deploy
    5. Once deploy, copy Wep App URL for the Script URL
    6. In the script, add several stuff to the const:
        - SECRET_CODE       : Too validate script with .env / format: '123'
        - SPREADSHEET_ID    : Connect to spreadsheet / format: '1abcde2'
        - SHEET_NAME        : Sheet to save data / format: 'Sheet1'

C. Telegram Bot
    - Setup your telegram bot. just set it up and take the API
    - Watch YT LOL

D. dotenv
    For available links:
    - Script
    - Telegram Token
    - Secret code (from script)

To start: npm run dev

May this app to be usefull,
-MRI



