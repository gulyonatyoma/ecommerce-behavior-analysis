import pandas as pd


def check_missing_values(df: pd.DataFrame) -> pd.DataFrame:
    """
    Проверяет количество пропущенных значений.
    """

    return (
        df.isna()
        .sum()
        .sort_values(ascending=False)
        .to_frame("missing_count")
    )


def check_duplicates(df: pd.DataFrame) -> int:
    """
    Возвращает количество дубликатов.
    """

    return df.duplicated().sum()


def get_dataframe_info(df: pd.DataFrame) -> dict:
    """
    Возвращает базовую информацию о DataFrame.
    """

    return {
        "rows": df.shape[0],
        "columns": df.shape[1],
        "duplicates": check_duplicates(df),
        "missing_values": int(df.isna().sum().sum())
    }
