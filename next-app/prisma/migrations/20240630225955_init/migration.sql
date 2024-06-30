-- CreateTable
CREATE TABLE "Price" (
    "title" VARCHAR(255) NOT NULL,
    "value" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("title")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "inCourse" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barrio" (
    "name" TEXT NOT NULL,
    "distritoName" TEXT NOT NULL,

    CONSTRAINT "Barrio_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Distrito" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Distrito_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "Price_title_key" ON "Price"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Curso_id_key" ON "Curso"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Barrio_name_key" ON "Barrio"("name");

-- CreateIndex
CREATE INDEX "Barrio_distritoName_idx" ON "Barrio"("distritoName");

-- CreateIndex
CREATE UNIQUE INDEX "Distrito_name_key" ON "Distrito"("name");
