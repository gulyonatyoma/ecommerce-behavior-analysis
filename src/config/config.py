from pathlib import Path
import os
from dotenv import load_dotenv

load_dotenv()


PROJECT_ROOT = Path(__file__).resolve().parents[2]


DATA_DIR = PROJECT_ROOT / "data"

RAW_DATA_DIR = DATA_DIR / "raw"

PROCESSED_DATA_DIR = DATA_DIR / "processed"

INTERIM_DATA_DIR = DATA_DIR / "interim"


NOTEBOOKS_DIR = PROJECT_ROOT / "notebooks"

REPORTS_DIR = PROJECT_ROOT / "reports"

DOCS_DIR = PROJECT_ROOT / "docs"



PROJECT_NAME = "ecommerce-behavior-analysis"

RANDOM_STATE = 42



TEST_SIZE = 0.2

VALIDATION_SIZE = 0.2



ENVIRONMENT = os.getenv(
    "ENVIRONMENT",
    "development"
)
