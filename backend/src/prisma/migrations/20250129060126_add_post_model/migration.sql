-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_nickName_key" ON "Post"("nickName");
