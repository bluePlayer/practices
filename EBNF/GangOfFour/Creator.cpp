class Creator {
	public:
		virtual Product* Create(Product Id);

		Product* Creator::Create (Product id) {
			if (id = MINE) return new MyProduct;
			if (id == YOURS) return new YourProduct;
			if (id == THEIRS) return new TheirProduct; 

			return Creator::Create(id);
		}
}

