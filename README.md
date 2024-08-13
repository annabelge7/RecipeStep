# Recipe Step Tracker

## Mini Design Doc link:

https://docs.google.com/document/d/1ba2qhVifxn3OqIsrXLqlD-HNH_Rtdz0u5GAecakL9JE/edit#heading=h.eo049dwfvyjv
anyone with link should have viewing access

## Setup

I noticed that when you use poetry in the backend to run makemigrations --> migration --> runserver, it clears the database because db.splite3 is currently included in the .gitnore based on the default settings of django and the starter code for this project. However
once you migrate everything and then only continue to run the server, it will persistently load the data (recipe steps) no matter if you
reload the page, restart the server or restart the frontend web app.

Additionally, I did not use a virtual environment for this project as I just installed poetry and it worked seamlessly.
# evenlySplit
