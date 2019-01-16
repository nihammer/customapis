#!/bin/bash

unlock() {
    echo -e "\n\n"
    firebase functions:config:get
    echo -e "\n\n"
}

last() {
    unlock
    echo "##################################"
    echo "status=${?}"
    echo "##################################"
    exit $?
}

trap 'last' 1 2 3 15

execute() {
    echo "Start"
    sleep 5
    echo "End"
}

execute
