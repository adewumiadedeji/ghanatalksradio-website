export interface RaffleSponsorDto {
  name: string;
}

export interface RaffleDto {
  slug: string;
  name: string;
  description: string | null;
  starts_at: string;
  ends_at: string;
  entries_close_at: string;
  requires_registered_user: boolean;
  allow_free_entry: boolean;
  entry_price: number | null;
  entry_currency: string | null;
  number_of_winners: number | null;
  sponsor: RaffleSponsorDto | null;
}
