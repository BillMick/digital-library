# Misc_Interface.py


def JSCodeArguments():
    """
    Retrieves command-line arguments passed to a Python script.

    Returns:
        list: A list containing the command-line arguments passed to the script.

    Example:
        To retrieve command-line arguments in a script:

        >>> args = JSCodeArguments()
        >>> print(args)
        ['userId', 'question']
    """
    import sys
    arguments = sys.argv[1:]
    return arguments


def RagResponse():
    import os
    import google.generativeai as genai
    from dotenv import load_dotenv
    
    # Getting args
    arguments = JSCodeArguments()
    userId, prompt = arguments[0], arguments[1]
    print("Arguments received:", arguments)
    
    # Settings for connection to GCP
    load_dotenv()
    genai.configure(api_key=os.getenv("API_KEY"))
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "resources/infra-odyssey-421910-7e0f2f55ded1.json" # GCP service credentials
    
    # Settings for connection to DB
    from sqlalchemy import create_engine, text
    from langchain_community.utilities import SQLDatabase

    engine = create_engine(os.getenv("DATABASE_URL"))
    db = SQLDatabase(engine)

    # Settings for agent creation (langchain + llm + db)
    from langchain_community.agent_toolkits.sql.base import create_sql_agent
    from langchain_community.agent_toolkits.sql.toolkit import SQLDatabaseToolkit
    from langchain.agents.agent_types import AgentType
    from langchain_google_genai import ChatGoogleGenerativeAI

    model_id = 'gemini-2.0-flash'
    llm = ChatGoogleGenerativeAI(model = model_id, temperature = 0)
    toolkit = SQLDatabaseToolkit(db = db, llm = llm)

    agent_executor = create_sql_agent(
        llm = llm,
        toolkit = toolkit,
        verbose = True,
        agent_type = AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    )

    response = agent_executor.invoke(prompt)
    print(response)
    
    import json
    # Define the file path using userId
    file_path = os.path.join("resources", f"{userId}.json")

    # Prepare data for saving in json file
    data = { "userId": userId, "prompt": prompt, "response": response }
    
    # Check if the file exists and append to it or create a new one
    if os.path.exists(file_path):
        with open(file_path, "r+") as file:
            try:
                existing_data = json.load(file)
            except json.JSONDecodeError:
                existing_data = []

            existing_data.append(data)

            file.seek(0)
            json.dump(existing_data, file, indent=4)
    else:
        # If the file does not exist, create it and write the data
        with open(file_path, "w") as file:
            json.dump([data], file)




if __name__ == "__main__":
    RagResponse()
    print("###### END RAG ######")
