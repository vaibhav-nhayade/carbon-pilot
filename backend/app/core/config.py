from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "CarbonPilot AI"
    app_version: str = "1.0.0"

    database_url: str = (
        "postgresql://carbonpilot:carbonpilot@localhost:5432/carbonpilot"
    )

    secret_key: str = "change-this-in-production"
    access_token_expire_minutes: int = 60 * 24

    cors_origins: str = "http://localhost:3000"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def cors_origin_list(self) -> list[str]:
        return [
            origin.strip()
            for origin in self.cors_origins.split(",")
            if origin.strip()
        ]


settings = Settings()