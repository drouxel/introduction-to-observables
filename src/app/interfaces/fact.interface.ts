export interface Fact {
    id: number;
    joke: string;
    created_at: Date;
    updated_at?: Date;
    ratingScore?: number;
}