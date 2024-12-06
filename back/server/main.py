from dotenv import load_dotenv
import uvicorn
load_dotenv('.env.local')
load_dotenv('.env')

if __name__ == "__main__":
    uvicorn.run("server.server:app", host="0.0.0.0", port=8080, log_level="debug")
