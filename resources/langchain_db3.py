import os
import google.generativeai as genai
from dotenv import load_dotenv
load_dotenv()
GOOGLE_API_KEY = os.getenv("API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "resources/infra-odyssey-421910-7e0f2f55ded1.json"
from sqlalchemy import create_engine, text
from langchain_community.utilities import SQLDatabase

# Replace with your database connection details
DATABASE_URI = "postgresql://postgres:postgres@localhost:5432/digital_library"
engine = create_engine(DATABASE_URI)
db = SQLDatabase(engine)

from langchain_community.agent_toolkits.sql.base import create_sql_agent
from langchain_community.agent_toolkits.sql.toolkit import SQLDatabaseToolkit
from langchain.agents.agent_types import AgentType
from langchain_google_genai import ChatGoogleGenerativeAI

model_id = 'gemini-2.0-flash'
llm = ChatGoogleGenerativeAI(model=model_id)
toolkit = SQLDatabaseToolkit(db=db, llm=llm)

agent_executor = create_sql_agent(
    llm=llm,
    toolkit=toolkit,
    verbose=True,
    agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
)

response = agent_executor.run("Pourrais-tu me proposer des livres dont la catégorie est Art ?")
print(response)

