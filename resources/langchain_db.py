from langchain_community.utilities import SQLDatabase
from langchain_experimental.sql import SQLDatabaseChain
from dotenv import load_dotenv
import os

load_dotenv()

db = SQLDatabase.from_uri(os.environ.get("DATABASE_URL"))

prompt = "How many files in the database ?"
import google.generativeai as genai

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

# db_chain = SQLDatabaseChain(llm_chain=model, database=db, verbose=True)
# ans = db_chain.run(prompt)

# print(ans)

from langchain.llms import BaseLLM
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
class GenerativeAIWrapper(BaseLLM):
    def __init__(self, model):
        self.model = model

    def _call(self, prompt: str) -> str:
        return self.model.generate(prompt) 
        
    @property
    def _llm_type(self) -> str:
        return "GenerativeAI"  
# Wrap the generative model in a LangChain LLM
model_wrapper = GenerativeAIWrapper(model)

# Create a LangChain prompt template
prompt_template = PromptTemplate(input_variables=["query"], template="{query}")

# Create the LLM chain using the wrapped model and prompt template
llm_chain = LLMChain(llm=model_wrapper, prompt=prompt_template)
db_chain = SQLDatabaseChain(llm_chain=llm_chain, database=db, verbose=True)
ans = db_chain.run(prompt)

print(ans)
