/home/julian/Desktop/ensino-aula-angular-net-2022/apagar/julian-gamboa-ensino.github.io/fonte-atualizacoes-json/pasta_certificador_aws/images/subir_aws



for file in *.webp; 
do 
	nome=$(echo $file | cut -d'.' -f1)
	final=$nome".jpg"
	echo $final
	ffmpeg -i "$file" "$final"
done