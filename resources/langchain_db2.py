from langchain_community.utilities import SQLDatabase
from langchain_experimental.sql import SQLDatabaseChain
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize the SQL database from the URI in environment variables
db = SQLDatabase.from_uri(os.environ.get("DATABASE_URL"))

# Define the query prompt
prompt = "How many files in the database ?"

# Import the necessary libraries
import google.generativeai as genai
from langchain.llms import BaseLLM  # Import the BaseLLM class from langchain

# Set up the API key for the generative model
GOOGLE_API_KEY = os.getenv("API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize the generative model (ensure "gemini-2.0-flash" is correct for the API)
model = genai.GenerativeModel("gemini-2.0-flash")

# Custom LangChain wrapper for the Generative AI model
class GenerativeAIWrapper(BaseLLM):
    def __init__(self, model):
        self.model = model

    def _generate(self, prompt: str, stop: list = None) -> str:
        # Assuming 'generate' is the method that makes the API call and returns the result
        # If there's a different method for generating text in your model, adjust this call accordingly.
        response = self.model.generate(prompt)
        return response['text']  # Adjust this based on the actual response format of the API
        
    @property
    def _llm_type(self) -> str:
        return "GenerativeAI"

# Wrap the generative model with the LangChain LLM interface
model_wrapper = GenerativeAIWrapper(model)

# Create a prompt template for LangChain (optional)
from langchain.prompts import PromptTemplate  # Ensure PromptTemplate is imported
prompt_template = PromptTemplate(input_variables=["query"], template="{query}")

# Initialize the LangChain LLM chain with the model and template
from langchain.chains import LLMChain  # Ensure LLMChain is imported
llm_chain = LLMChain(llm=model_wrapper, prompt=prompt_template)

# Set up the SQLDatabaseChain to link the database and model
db_chain = SQLDatabaseChain(llm_chain=llm_chain, database=db, verbose=True)

# Execute the chain with the query prompt
ans = db_chain.run(prompt)

# Print the answer from the chain
print(ans)
