-- CreateTable
CREATE TABLE "transactions" (
    "id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "category_name" TEXT NOT NULL,
    "transaction_date" DATE NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);
