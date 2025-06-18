* **v2.1.2** Tue Jun 17 2025 Lolito Cabornay <61818530+jhoe1012@users.noreply.github.com> (d67a39f)
  - Refactor PRController to use view_item_details for item details retrieval and update Edit component to handle item_details as an array
  - [FIX] PO Controller to  include additional status checks
  - [FIX]  PR Controller to improve item detail retrieval.
  - [FIX] PO mass print templates for accurate pricing calculations and formatting.
  - [ENHANCE] alter column price 3 decimals

* **v2.1.1** 
  - Fix typo error in PO controller
  - Remove unused files


* **v2.1.0**
  - Comment out conditional checks for 'is_mother_po' in email templates
  - Enhance PR creation and editing by adding materialGroupsSupplies data and updating validation logic for PR Controller Group 
  - Additional Column Plant for PR Report (#67) 
  - Net Price behavior additional fix for Issue #46 (#65)* additional fix for : Issue #46
  - Update usePOMaterial.tsx
  - Addional text limit for header in PO printing (#66)* Addional text limit for header in PO printing
  - Updated css for printing PO (#58)* Updated css for printing PO
  - [Fix] Update updateMaterialPR calls in Create and Edit components to include prCtrlGrp parameter
  - [Fix] Simplify UOM conversion logic in Create and Edit components
  - [Fix] Enhance UOM conversion logic to handle materialGeneric cases in Create component
  - Refactor: Update material handling logic to use materialGeneric for price and unit validation in Create and Edit components
  - Add tab icons to various forms and components for improved UI clarity
  - [Fix] PO history report item text
  - [Fix] Update logo dimensions in ApplicationLogo component and enhance button styling in Login page
  - Features/for diff po form (#62)* Add choices for different type of PO form
  - Fix approval logic
  - Temp remove selection of printing diff PO form.
  - [Fix] logic on conversion of supplies and services.
  - [Fix] PR report wrong header
  - [Bug]: Check PO cancellation which sometimes cause of wrong computation of PO PR #46 (#55)
  - Revamp on HandleImport Function (#57)* Changes on HandleImport function
  - [Fix] Editing Finished PR Fails to Proceed Due to Delivery Date Validation Including Deleted Items bug Something isn't working (#56)* Fix delivery date validation to ignore deleted items when editing PR (#53)
  - Add email attachments for approval function PR PO (#25)
  - [Bug] Fix issue when retrieving GR line items from POs with a null status. (d85a8657e298578e5da0cc92f9cb3ab88f31193f)
  - Add Item text in PR PO list (#34)
  - Add condition in email for mother PO (#33)
  - Add plant selection for PO PR GR list and report (#16)
  - Add Item text in create GR (#36)
  - [Bug]:Fix when editing a PO and adding a new line, the PO ID gets updated based on the PR ID, which results in incorrect data being saved (#40)
  - [Fix] use load() for retrieving workflows (#43)
  - [Fix] for material code select behavior (#35)
  - [Bug]: PR Create item text and PR Controller does not update value (#48)
  - Enhance Alternative UOM View with Search and Selection (#42)
  - [Refactor] update user plants fetching method and PRController query logic (#23) 


* **v2.0.1**

  - Fix when editing a PO and adding a new line, the PO ID gets updated based on the PR ID, which results in incorrect data being saved

- Sun Mar 23 2025 Lolito Cabornay <61818530+jhoe1012@users.noreply.github.com> (c1d34b0)

* **v2.0.0**

  - Add P200 PO printing - Fix minor bugs
  - Fix for retrieving users email based on plant.Fix for retrieving users email based on plant.
  - Fix for retrieving users email based on plant.
  - Fix report condition - Fix address and note dropdown
  - Fix copy PR
  - Fix force https
  - Fix Merge error - Fix code formatting
  - Add PR Controller Group functionality and related migrations
  - Changed the 'Mat Grp' value from a code to a description.
  - Fix duplicate vendor update route
  - Modify Alt UOM
  - Fix Menu function call
  - Fix Print PO permssion
  - Changed the 'Mat Grp' value from a code to a description.
  - Add PR Controller Group functionality and related migrations
  - post script updates.
  - Update on email conditions
  - New features for email , supports on buyer cc and attachements.
  - Added email notification for buyer upon final PR approval.
  - Added email notification for buyer upon final PR approval.
  - Fix SSL concern
  - Add tanstack table - Fix sorting in pr po - Fix Gr Filtering
  - Administration Upload Functions
  - Minor Fixes - add badges, filtering
  - Fix logic in GR and add delivery completion to PO.
  - ADD O365 login
  - Bump dependencies
  - Refactor code style and remove unused imports
  - ADD spatie roles and permission - REMOVE custom roles and permission
  - ADD dashboard FIX paginate add query string
  - Fix PO/PR logic in discard. Fix PR line item email remove flag deleted.
  - Fix total value computation
  - FIX Total Value computation
  - REFINE InputField and PO components for improved styling and consistency
  - ADD net price computation base on maintained net price in DB. - FIXED minor bugs
  - ADD user maintenance. Update PR validation.
  - REFINE code formatting in various Admin pages for improved readability
  - ADD is_supplies column to material_groups table; update related forms and hooks for material group handling
  - ADD is_mother_po field to POHeader model and related resources; update forms and queries
  - Add mass printing ang mass update of control number. - Fix minor typos
  - ADD CC functionality for PO approval notifications; update user model and migration
  - REMOVE disabled state for B.UOM fields in Create and Edit pages
  - ADD ALT UOM crud and Material fetching functionality; update routes and resources
  - ADD item_text to DEFAULT_PR_MATERIAL and update related logic; fix minor issues in PR/PO alt uom
  - UPDATE SHORT TEXT TO MATERIAL DESCTIPTIONS
  - ADD MATERIAL CRUD
  - ADD IMPORT AND EXPORT FUNCTIONALITY FOR MATERIAL VALUATION
  - UPDATE MATERIAL INFO LOGIC AND DATE HANDLING IN PR/PO
  - BUILD FOR TESTING
  - ADD MATERIALGROUPS RELATION AND ITEM TEXT FIELD TO PR/PO MODELS AND RESOURCES
  - ADD NET PRICE UPDATE LOGIC IN PO APPROVAL
  - FIX LOGIC IN FLAGS FOR PR/PO
  - ADD COPY PR
  - UPDATE PO CREATE AND EDIT - ADD ALT UOM ORD FUNCTIONALITY
  - OPTIMIZE UPDATE PR - ADD ATTACHMENTLIST AND GENERIC TABLE COMPONENT
  - OPTIMIZE CREATE PR - ADD CUSTOM HOOKS - ADD INDEX.JS FOR EXPORT/IMPORT

- Fri Dec 06 2024 jhoe1012 <jhoecabornay@gmail.com> (29b8474)

* **v1.0.7**

  - ADD OPEN PO QTY IN FILTERING

- Tue Nov 26 2024 jhoe1012 <jhoecabornay@gmail.com> (8bd0261)

* **v1.0.6**

  - UPDATE GR REPORT

- Mon Nov 18 2024 jhoe1012 <jhoecabornay@gmail.com> (d8213bd)

* **v1.0.5**
  - ADD DELIVERY DATE IN PO REPORT

- Thu Nov 14 2024 jhoe1012 <jhoecabornay@gmail.com> (05c15f9)

* **v1.0.4**
  - FIX SUBMIT STATUS DUPLICATES

- Thu Nov 14 2024 jhoe1012 <jhoecabornay@gmail.com> (70503f0)

* **v1.0.3**
  - FIX PO PRINTING VAT COMPUTATION TO 2 DECIMAL
  - UPDATE PO REPORT - ADD 50 ROWS PER PAGE AND STRIPE IN TABLES
  - ADD FILTERING IN MATERIAL REPORT

- Mon Nov 04 2024 jhoe1012 <jhoecabornay@gmail.com> (addd96a)

* **v1.0.2**

  - OPTIMIZE PO/LPO CONTROLLER
  - ADD EXCEPTION HANDLING
  - FIX SPECIAL CHAR IN ATTACHMENT NAME
  - ADD DESCRIPTION IN FILTER
  - FIX GR : ADD CONTROL NUMBER IN SEARCHING PO
  - ADD MATERIAL REPORT
  - ADD NOTES IN APPROVE
  - RENAME AsnycSelect TO AsyncSelect
  - CHANGE SVG TO HERO ICON COMPONENT

- Tue Oct 22 2024 jhoe1012 <jhoecabornay@gmail.com> (973126b)

* **v1.0.1**

  - FIX ADD/UPDATE PR TO REDIRECT TO EDIT
  - ADD CYPRES FOR AUTOMATED TESTING
  - ADD DRAG AND DROP FILE UPLOAD - REMOVE UNUSED CODE IN GR
  - FIX PO INDEX FILTER

- Wed Oct 16 2024 jhoe1012 <jhoecabornay@gmail.com> (988ef4c)

* **v1.0.0**
