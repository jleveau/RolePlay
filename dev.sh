#!/bin/bash

# Colors for pretty output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Help function to display usage
usage() {
    echo -e "${YELLOW}Usage: $0 [option]${NC}"
    echo "Options:"
    echo "  start   : Start the project"
    echo "  stop    : Stop the project"
    echo "  restart : Restart the project"
    echo "  logs    : View logs"
    echo "  help    : Display this help message"
}

# Check if parameters are passed
if [ $# -eq 0 ]; then
    usage
    exit 1
fi

# Actions based on user input
case $1 in
    start)
        echo -e "${GREEN}🚀 Starting the project...${NC}"
        docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d
        ;;
    stop)
        echo -e "${RED}🛑 Stopping the project...${NC}"
        docker-compose -f docker-compose.yml -f docker-compose-dev.yml down
        ;;
    restart)
        echo -e "${YELLOW}🔄 Restarting the project...${NC}"
        docker-compose -f docker-compose.yml -f docker-compose-dev.yml down
        docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d
        ;;
    logs)
        echo -e "${YELLOW}📜 Viewing logs...${NC}"
        docker-compose -f docker-compose.yml -f docker-compose-dev.yml logs -f        
        ;;
    help)
        usage
        ;;
    *)
        echo -e "${RED}❌ Invalid option: $1${NC}"
        usage
        exit 1
        ;;
esac
