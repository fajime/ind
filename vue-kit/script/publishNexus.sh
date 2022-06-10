#!/bin/bash
# Version key/value should be on his own line
PACKAGE_VERSION=$(cat ./package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[ ",]//g')

# Version key/value should be on his own line
PROJECT_NAME=$(cat ./package.json \
  | grep name \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[ ",]//g' )

PROJECT_NAME_NO_AT=$(cat ./package.json \
  | grep name \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[ ",]//g' \
  | sed 's/[@]//g' )

BRANCH="$(git branch --show-current)"

printf "Publicando el proyecto $PROJECT_NAME en nexus la rama $BRANCH con la versión: $PACKAGE_VERSION\n"

# Configure username to use. The password will be prompted for later.
read  -p "username: " USER

# The URL for the Nexus server
NEXUS_SERVER=https://slmaven.indra.es/nexus
# The name of the raw repository
REPOSITORY_NAME=FMWK_Raw

# Make our base Nexus repository directory URL
DEST_REPO_DIRECTORY="${NEXUS_SERVER}/repository/${REPOSITORY_NAME}/front/${PROJECT_NAME_NO_AT}/${BRANCH}"

# The directory to get the contents of to upload
LOCAL_DOCS=./dist

# Prompt for the user password to use
read -s -p "Password for $USER: " PASS

# Find all the files in the directory and upload them. 
# This may have issues if you had spaces in filenames, but 
# generated documentation produced by compodoc doesn't
printf "\nProcesando...."
FILES=$(find "$LOCAL_DOCS" -type f -print); 
FILES_COUNT=$(find "$LOCAL_DOCS" -type f -print | wc -l | xargs);
printf "Numero de ficheros:  ${FILES_COUNT}"

COUNTER=0;
for file in $(find "$LOCAL_DOCS" -type f -print); do
    COUNTER=$((COUNTER+1));
    PERCENT=$((COUNTER*100/FILES_COUNT));
    # Need to trim the local documentation directory part off the string
    destination_file="${file/$LOCAL_DOCS/}"
    
        # delete from the current position to the start of the line
    printf "\e[2K"
    # print '[' and place '=>' at the $i'th column
    printf "${COUNTER}/${FILES_COUNT} (${PERCENT}%%) - Fichero:  ${destination_file} \e[1A\n"

    # Upload the file
    # This uses verbose logging, you will want to reduce the logging here
    # if using this in a production environment
    curl --user "${USER}:${PASS}" --upload-file "$file" "${DEST_REPO_DIRECTORY}${destination_file}"
done
printf "\e[2K"

printf "\n\nSi no ha habido errores antes de este mensaje, el sitio está disponible en ${DEST_REPO_DIRECTORY}/index.html\n"

