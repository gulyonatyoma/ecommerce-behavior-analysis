from pathlib import Path
import pandas as pd


def load_csv(file_path: str | Path) -> pd.DataFrame:
    """
    Загружает CSV файл и возвращает DataFrame.
    
    Parameters
    ----------
    file_path : str | Path
        Путь к CSV файлу.

    Returns
    -------
    pd.DataFrame
        Загруженный датасет.
    """

    file_path = Path(file_path)

    if not file_path.exists():
        raise FileNotFoundError(
            f"File not found: {file_path}"
        )

    return pd.read_csv(file_path)
